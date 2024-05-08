import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  dbName: process.env.POSTGRES_DATABASE,
  host: process.env['POSTGRES_HOST'],
  port: Number(process.env['POSTGRES_PORT'] || '23455'),
  user: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  entities: ['dist/src/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  debug: true,
});
