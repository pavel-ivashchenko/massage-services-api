
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp({ userName, password }: AuthCredentialsDto): Promise<void> {
    const user = new User();
    user.userName = userName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    console.log(user);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.')
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  
  async validateUserPassword({ userName, password }: AuthCredentialsDto): Promise<string> {
    const user = await this.findOne({ userName });
    if (user && await user.validatePassword(password)) {
      return user.userName;
    } else {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
  
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
