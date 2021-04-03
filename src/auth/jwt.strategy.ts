
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';

import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repostiory';


export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
    })
  }
  
  async validate({ userName }: IJwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({ userName });
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
  
}
