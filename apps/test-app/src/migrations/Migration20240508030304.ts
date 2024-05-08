import { Migration } from '@mikro-orm/migrations';

export class Migration20240508030304 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "permissions" ("id" varchar(255) not null, "action" text check ("action" in (\'create\', \'read\', \'update\', \'delete\')) not null, "subject" text check ("subject" in (\'Users\')) not null, "condition" jsonb not null default \'{}\', constraint "permissions_pkey" primary key ("id"));');

    this.addSql('create table "roles" ("id" varchar(255) not null, "name" text check ("name" in (\'Owner\', \'Admin\', \'BillingManager\', \'InfrastructureManager\', \'Member\')) not null, constraint "roles_pkey" primary key ("id"));');

    this.addSql('create table "roles_permissions" ("role_model_id" varchar(255) not null, "permission_model_id" varchar(255) not null, constraint "roles_permissions_pkey" primary key ("role_model_id", "permission_model_id"));');

    this.addSql('alter table "roles_permissions" add constraint "roles_permissions_role_model_id_foreign" foreign key ("role_model_id") references "roles" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "roles_permissions" add constraint "roles_permissions_permission_model_id_foreign" foreign key ("permission_model_id") references "permissions" ("id") on update cascade on delete cascade;');
  }

}
