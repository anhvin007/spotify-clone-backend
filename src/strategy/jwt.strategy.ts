// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Artist } from 'src/entities/artist.entity';
import { authConstants } from 'src/modules/auth/auth.constants';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any) {
    // Gán user ID và email vào req.user
    return { 
      userId: payload.userId,
      email: payload.email,
      artistId: payload.artistId
    };
  }
}