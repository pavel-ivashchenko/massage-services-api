
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = new User();
    user.userName = username;
    user.password = password;
    await user.save();
  }
}
