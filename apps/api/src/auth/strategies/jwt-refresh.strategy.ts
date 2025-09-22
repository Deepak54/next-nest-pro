import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

function cookieExtractor(req: any) {
  return req?.cookies?.rt || null;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
      passReqToCallback: true,
    });
  }
  async validate(req: any, payload: any) {
    const rt = cookieExtractor(req);
    if (!rt) throw new UnauthorizedException();
    (req as any).refreshToken = rt;
    return { userId: payload.sub };
  }
}
