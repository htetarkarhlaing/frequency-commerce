import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/lib/prisma.service';
import { JWTAuthGuard } from 'src/auth/jwt.guard';

@Module({
  providers: [CategoryResolver, CategoryService, PrismaService, JWTAuthGuard],
})
export class CategoryModule {}
