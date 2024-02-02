import axios from "axios";

export interface AccessTokenProps {
  token: string,
  tokenType: string,
  expiresIn: number,
  refreshToken: string,
  scope: string,
}

let accessToken: AccessTokenProps | null = null;

export function setAccessToken(passedToken: AccessTokenProps) {
  accessToken = passedToken;
}

export function getAccessToken() {
  return accessToken;
}

