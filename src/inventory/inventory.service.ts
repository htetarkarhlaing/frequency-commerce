import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import {
  CreateAdjustmentRecordInput,
  CreatePurchaseRecordInput,
} from 'src/graphql';
import { PurchaseRecord, StockAdjustmentRecord } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  getAllPurchasingRecord(): Promise<PurchaseRecord[]> {
    return this.prisma.purchaseRecord.findMany({
      include: {
        CreatedBy: true,
        Product: {
          include: {
            Category: true,
          },
        },
      },
    });
  }

  getPurchasingRecordById(id: string): Promise<PurchaseRecord | null> {
    return this.prisma.purchaseRecord.findFirst({
      where: {
        id: id,
      },
      include: {
        CreatedBy: true,
        Product: {
          include: {
            Category: true,
          },
        },
      },
    });
  }

  getAllAdjustmentRecord(): Promise<StockAdjustmentRecord[]> {
    return this.prisma.stockAdjustmentRecord.findMany({
      include: {
        CreatedBy: true,
        Product: {
          include: {
            Category: true,
          },
        },
      },
    });
  }

  getAdjustmentRecordById(id: string): Promise<StockAdjustmentRecord | null> {
    return this.prisma.stockAdjustmentRecord.findFirst({
      where: {
        id: id,
      },
      include: {
        CreatedBy: true,
        Product: {
          include: {
            Category: true,
          },
        },
      },
    });
  }

  async createPurchaseRecord(
    data: CreatePurchaseRecordInput,
    createdById: string,
  ): Promise<PurchaseRecord | null> {
    await this.prisma.product.update({
      where: {
        id: data.productId,
      },
      data: {
        stock: {
          increment: data.amount,
        },
      },
    });
    return this.prisma.purchaseRecord.create({
      data: {
        amount: data.amount,
        Product: {
          connect: {
            id: data.productId,
          },
        },
        CreatedBy: {
          connect: {
            id: createdById,
          },
        },
      },
      include: {
        Product: {
          include: {
            Category: true,
          },
        },
        CreatedBy: true,
      },
    });
  }

  async createAdjustmentRecord(
    data: CreateAdjustmentRecordInput,
    createdById: string,
  ): Promise<PurchaseRecord | null> {
    if (data.adjustmentType === 'REMOVE') {
      await this.prisma.product.update({
        where: {
          id: data.productId,
        },
        data: {
          stock: {
            decrement: data.amount,
          },
        },
      });
    } else {
      await this.prisma.product.update({
        where: {
          id: data.productId,
        },
        data: {
          stock: {
            increment: data.amount,
          },
        },
      });
    }

    return this.prisma.stockAdjustmentRecord.create({
      data: {
        amount: data.amount,
        Product: {
          connect: {
            id: data.productId,
          },
        },
        CreatedBy: {
          connect: {
            id: createdById,
          },
        },
        adjustmentType: data.adjustmentType,
      },
      include: {
        Product: {
          include: {
            Category: true,
          },
        },
        CreatedBy: true,
      },
    });
  }
}
