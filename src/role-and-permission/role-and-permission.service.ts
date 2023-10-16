import { Injectable } from '@nestjs/common';
import { Permission, Role } from '@prisma/client';
import { CreatePermissionInput, CreateRoleInput } from 'src/graphql';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class RoleAndPermissionService {
  constructor(private prisma: PrismaService) {}

  // * ------------------------------------------ Role -----------------------------------------------------------
  async getRoleById(id: string): Promise<Role | null> {
    return this.prisma.role.findFirst({
      where: {
        id: id,
      },
      include: {
        RoleOnPermissions: {
          include: {
            Permission: true,
          },
        },
      },
    });
  }

  async getRoleList(): Promise<Role[]> {
    return this.prisma.role.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        RoleOnPermissions: {
          include: {
            Permission: true,
          },
        },
      },
    });
  }

  async createRole(data: CreateRoleInput): Promise<Role | null> {
    const permissionIdList = data.permissionList.map((permissionId: string) => {
      return {
        permissionId: permissionId,
      };
    });

    return this.prisma.role.create({
      data: {
        name: data.name,
        RoleOnPermissions: {
          createMany: {
            data: permissionIdList,
          },
        },
      },
      include: {
        RoleOnPermissions: {
          include: {
            Permission: true,
          },
        },
      },
    });
  }

  // * -------------------------------------- Permission -----------------------------------------------------------

  async getPermissionById(id: string): Promise<Permission | null> {
    return this.prisma.permission.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getPermissionList(): Promise<Permission[]> {
    return this.prisma.permission.findMany({
      where: {
        status: 'ACTIVE',
      },
    });
  }

  async createPermission(
    data: CreatePermissionInput,
  ): Promise<Permission | null> {
    return this.prisma.permission.create({
      data: {
        name: data.name,
        access: data.access,
      },
    });
  }
}
