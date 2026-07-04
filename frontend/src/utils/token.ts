import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  role?: string;
  exp: number;
}

export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);

  return decoded.exp * 1000 < Date.now();
}