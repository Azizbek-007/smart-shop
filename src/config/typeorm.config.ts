import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   autoLoadEntities: true,
//   synchronize: true,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'sx48Bq3A68NvPun',
    database: 'smart_shop',
    autoLoadEntities: true,
    synchronize: true,
    cache: {
      duration: 30000 // 30 seconds
    }
};
  