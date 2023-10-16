import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';
import { CreateCategoryInput } from 'src/graphql';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        CreatedBy: true,
      },
    });
  }

  getCategoryById(id: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        id: id,
      },
      include: {
        CreatedBy: true,
      },
    });
  }

  createCategory(data: CreateCategoryInput): Promise<Category | null> {
    return this.prisma.category.create({
      data: {
        name: data.name,
        CreatedBy: {
          connect: {
            id: data.createdById,
          },
        },
      },
      include: {
        CreatedBy: true,
      },
    });
  }
}
