export type Provider = "google" | "github" | "local";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  provider: Provider;
  avatarUrl?: string;
}

// What we persist locally after an OAuth round trip.
export interface AuthSession {
  accessToken: string;
  // Epoch ms the backend minted the token, from the `createdAt` query param.
  issuedAt: number;
}

// Shape of the JWT the backend signs (see utils/helper/jwt.token.ts).
export interface AccessTokenPayload {
  id: string;
  type: "access";
  refreshId?: string;
  iat: number;
  exp: number;
}
