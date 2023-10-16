import { Injectable } from '@nestjs/common';
import { OrderRecord, Prisma } from '@prisma/client';
import { CreateOrderRecordInput, ManageOrderRecord } from 'src/graphql';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  getOrderRecordById(id: string): Promise<OrderRecord | null> {
    return this.prisma.orderRecord.findFirst({
      where: {
        id: id,
      },
      include: {
        OrderCreatedBy: true,
        OrderApprovedBy: true,
        OrderDetail: {
          include: {
            Product: {
              include: {
                Category: true,
              },
            },
          },
        },
      },
    });
  }

  getOrderRecordList(): Promise<OrderRecord[]> {
    return this.prisma.orderRecord.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        OrderCreatedBy: true,
        OrderApprovedBy: true,
        OrderDetail: {
          include: {
            Product: {
              include: {
                Category: true,
              },
            },
          },
        },
      },
    });
  }

  async createOrder(
    data: CreateOrderRecordInput,
    createdById: string,
  ): Promise<OrderRecord | null> {
    let totalAmount = 0;
    const orderDetailInput: Prisma.OrderDetailCreateManyInput[] = [];
    for (let i = 0; i < data.detail.length; i++) {
      const orderDetail = data.detail[i];
      orderDetailInput.push({
        productId: orderDetail.productId,
        qty: orderDetail.qty,
        unitPrice: orderDetail.unitPrice,
        total:
          parseFloat(orderDetail.unitPrice.toString()) *
            parseFloat(orderDetail.qty.toString()) || 0,
      });
      await this.prisma.product
        .update({
          where: {
            id: orderDetail.productId,
          },
          data: {
            stock: {
              decrement: orderDetail.qty,
            },
          },
        })
        .then((product) => {
          totalAmount += orderDetail.qty * product.price;
        });
    }

    const createdOrder = await this.prisma.orderRecord.create({
      data: {
        totalAmount,
        OrderCreatedBy: {
          connect: {
            id: createdById,
          },
        },
        OrderDetail: {
          createMany: {
            data: orderDetailInput,
          },
        },
      },
    });

    return createdOrder;
  }

  async manageOrder(data: ManageOrderRecord, approvedById: string) {
    return this.prisma.orderRecord.update({
      data: {
        orderStatus: data.orderStatus,
        OrderApprovedBy: {
          connect: {
            id: approvedById,
          },
        },
      },
      where: {
        id: data.id,
      },
      include: {
        OrderDetail: true,
      },
    });
  }
}
