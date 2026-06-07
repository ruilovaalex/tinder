export interface JwtPayload {
  sub: number;
  email: string;
  tokenType: 'access' | 'refresh';
}
