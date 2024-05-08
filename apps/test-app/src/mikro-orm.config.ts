import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { PermissionModel, RoleModel } from './app/my-model.entity';

export default defineConfig({
  dbName: process.env.POSTGRES_DATABASE,
  host: process.env['POSTGRES_HOST'],
  port: Number(process.env['POSTGRES_PORT'] || '23455'),
  user: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  entities: [RoleModel, PermissionModel],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  debug: true,
  extensions: [Migrator],
});
