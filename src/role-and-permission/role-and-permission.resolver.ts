import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RoleAndPermissionService } from './role-and-permission.service';
import { CreatePermissionInput, CreateRoleInput } from 'src/graphql';

@Resolver('RoleAndPermission')
export class RoleAndPermissionResolver {
  constructor(private roleAndPermissionService: RoleAndPermissionService) {}

  @Query('getRoles')
  async getRoleById(@Args('id') args: string) {
    return this.roleAndPermissionService.getRoleById(args);
  }

  @Query('getRoles')
  async getRoleList() {
    return this.roleAndPermissionService.getRoleList();
  }

  @Mutation('createRole')
  async createRole(@Args('data') args: CreateRoleInput) {
    return this.roleAndPermissionService.createRole(args);
  }

  @Query('getPermissions')
  async getPermissionList() {
    return this.roleAndPermissionService.getPermissionList();
  }

  @Mutation('createPermission')
  async createPermission(@Args('data') args: CreatePermissionInput) {
    return this.roleAndPermissionService.createPermission(args);
  }
}
