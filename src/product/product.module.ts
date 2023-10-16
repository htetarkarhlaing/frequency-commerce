import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { PrismaService } from 'src/lib/prisma.service';
import { JWTAuthGuard } from 'src/auth/jwt.guard';

@Module({
  providers: [ProductResolver, ProductService, PrismaService, JWTAuthGuard],
})
export class ProductModule {}
