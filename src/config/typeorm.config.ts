import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmConfig: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsRun: true,
  logger: 'simple-console',
  migrations: ['dist/migrations/*.js'],
  logging: ['query', 'error', 'info'],
};

export const AppDataSource = new DataSource({
  ...typeOrmConfig,
  entities: ['src/**/*.entity.ts'],
});
