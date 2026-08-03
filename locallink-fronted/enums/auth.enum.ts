// Backend endpoints, relative to NEXT_PUBLIC_API_URL.
export const AuthEndpoint = {
  GOOGLE: "/auth/google",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
} as const;

// Frontend routes.
export const AuthRoute = {
  LOGIN: "/login",
  // Where the backend redirects after a successful Google consent.
  OAUTH_SUCCESS: "/auth/success",
  HOME: "/",
} as const;

// localStorage keys — these must stay in sync with config/axios.api.ts.
export const AuthStorageKey = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  ISSUED_AT: "tokenIssuedAt",
} as const;

// Query params the backend puts on the success redirect.
export const OAuthParam = {
  TOKEN: "token",
  CREATED_AT: "createdAt",
  ERROR: "error",
} as const;
