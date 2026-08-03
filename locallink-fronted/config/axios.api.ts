import axios from "axios";


// create axios instance
const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  flag to avoid multiple refresh calls
type QueuedRequest = {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
};

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

// process queued requests
const processQueue = (error: Error | null, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error || !token) {
      prom.reject(error ?? new Error("Token refresh returned no token"));
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor (attach access token)
$axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle 401)
$axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // check 401 & avoid retry loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve($axios(originalRequest));
            },
            reject: (err: Error) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        // call refresh token API
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;

        // store new token
        localStorage.setItem("accessToken", newAccessToken);

        // update default header
        $axios.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return $axios(originalRequest);
      } catch (err) {
        processQueue(err as Error);

        // logout if refresh fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default $axios;