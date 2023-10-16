import { Module } from '@nestjs/common';
import { InventoryResolver } from './inventory.resolver';
import { InventoryService } from './inventory.service';
import { PrismaService } from 'src/lib/prisma.service';
import { JWTAuthGuard } from 'src/auth/jwt.guard';

@Module({
  providers: [InventoryResolver, InventoryService, PrismaService, JWTAuthGuard],
})
export class InventoryModule {}
