import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductInput } from 'src/graphql';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        status: 'ACTIVE',
      },
    });
  }

  getProductById(id: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });
  }

  createProduct(data: CreateProductInput): Promise<Product | null> {
    const { name, price, description, categoryId, image } = data;

    return this.prisma.product.create({
      data: {
        name,
        description: description,
        price,
        stock: 0,
        categoryId: categoryId,
        image: `${process.env.BASE_URL}uploads/${image}`,
      },
    });
  }
}
