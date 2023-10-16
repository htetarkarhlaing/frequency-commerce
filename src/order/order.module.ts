import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { PrismaService } from 'src/lib/prisma.service';
import { JWTAuthGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [],
  providers: [OrderResolver, OrderService, PrismaService, JWTAuthGuard],
})
export class OrderModule {}
