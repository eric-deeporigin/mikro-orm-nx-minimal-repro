import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  Property,
} from '@mikro-orm/core';

export enum RoleName {
  Owner = 'Owner',
  Admin = 'Admin',
  BillingManager = 'BillingManager',
  InfrastructureManager = 'InfrastructureManager',
  Member = 'Member',
}
export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum PermissableSubject {
  USER = 'Users',
}

export interface PermissionCondition {
  [key: string]: string | number | PermissionCondition;
}

@Entity({ tableName: 'permissions' })
export class PermissionModel {
  @Enum(() => PermissionAction)
  action!: PermissionAction;

  @Enum(() => PermissableSubject)
  subject!: PermissableSubject;

  @Property({ type: 'json', nullable: false, default: '{}' })
  condition!: PermissionCondition;
}

@Entity({ tableName: 'roles' })
export class RoleModel {
  @Enum(() => RoleName)
  name!: RoleName;

  @ManyToMany(() => PermissionModel)
  permissions: Collection<PermissionModel> = new Collection<PermissionModel>(
    this
  );
}
