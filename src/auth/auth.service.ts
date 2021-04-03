
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repostiory';


@Injectable()
export class AuthService {
  
  private logger = new Logger('AuthService');
  
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }
  
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }
  
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const userName = await this.userRepository.validateUserPassword(authCredentialsDto);
    if (!userName) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    
    const payload: IJwtPayload = { userName };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`);
    
    return { accessToken };
  }
  
}
