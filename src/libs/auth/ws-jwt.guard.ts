import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const client: SocketPayload = context.switchToWs().getClient<SocketPayload>();
    const token = client.handshake.auth?.token; // Get the JWT token from the `auth` field

    if (!token) {
      return false; // Deny connection if no token is provided
    }

    try {
      const decoded = this.jwtService.verify(token) as UserPayload; // Verify the token
      client.user = decoded;
      return true; // Allow connection
    } catch (err) {
      console.log('Invalid token:', err);
      return false; // Deny connection if the token is invalid
    }
  }
}
