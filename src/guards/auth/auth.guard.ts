import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { API_SECRET } from 'src/config/utility.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest() as Request;
    
    const token = this.extractTokenFromCookies(request);
    if (!token) throw new UnauthorizedException();
    
    try {
      const payload = await this.jwt.verifyAsync(token, { secret: API_SECRET });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, {
        cause: 'Token is mising or is invalid'
      })
    }

    return true;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    const [type, token] = request.cookies['access_token'] 
      ? request.cookies['access_token'].split(' ') 
      : []
    return type === 'Bearer' ? token : undefined;
  }
}
