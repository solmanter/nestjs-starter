import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const client: SocketPayload = context.switchToWs().getClient<SocketPayload>();
    const token = client.handshake.auth?.token; 

    if (!token) {
      return false; 
    }

    try {
      const decoded = this.jwtService.verify(token) as UserPayload;
      client.user = decoded;
      return true; 
    } catch (err) {
      console.log('Invalid token:', err);
      return false;
    }
  }
}
