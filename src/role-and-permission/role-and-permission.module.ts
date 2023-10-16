import { Module } from '@nestjs/common';
import { RoleAndPermissionResolver } from './role-and-permission.resolver';
import { RoleAndPermissionService } from './role-and-permission.service';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  providers: [
    RoleAndPermissionResolver,
    RoleAndPermissionService,
    PrismaService,
  ],
})
export class RoleAndPermissionModule {}
