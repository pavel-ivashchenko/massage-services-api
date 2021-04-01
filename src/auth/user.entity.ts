
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Article } from '@app/articles/article.entity';


@Entity()
@Unique(['userName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userName: string;
  
  @Column()
  password: string;
  
  @Column()
  salt: string;
  
  @OneToMany(type => Article, article => article.user, { eager: true })
  articles: Article[]
  
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
