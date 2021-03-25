
import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pivas',
  password: '48884888',
  database: 'm1-db',
  entities: [__dirname + '/../**/*.entitiy.ts'],
  synchronize: true
}
