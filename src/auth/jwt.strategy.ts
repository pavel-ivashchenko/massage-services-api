
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repostiory';


export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51'
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
