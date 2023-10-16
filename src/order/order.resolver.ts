/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { OrderService } from './order.service';
import {
  CreateOrderRecordInput,
  ManageOrderRecord,
  OrderRecord,
} from 'src/graphql';
import { Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

@Resolver('Order')
export class OrderResolver {
  constructor(private orderService: OrderService) {
    this.pubSub = new PubSub();
  }

  private pubSub: PubSub;

  @Query('getOrderRecord')
  @UseGuards(JWTAuthGuard)
  getOrderRecordById(@Args('id') id: string) {
    return this.orderService.getOrderRecordById(id);
  }

  @Query('getOrderRecords')
  @UseGuards(JWTAuthGuard)
  getOrderRecordList() {
    return this.orderService.getOrderRecordList();
  }

  @Mutation('createOrderRecord')
  @UseGuards(JWTAuthGuard)
  async createOrderRecord(
    @Args('data') args: CreateOrderRecordInput,
    @Context() context,
  ) {
    return this.orderService.createOrder(args, context.req.user.id);
  }

  @Mutation('manageOrderRecord')
  @UseGuards(JWTAuthGuard)
  async manageOrderRecord(
    @Args('data') args: ManageOrderRecord,
    @Context() context,
  ) {
    const changedStatus = await this.orderService.manageOrder(
      args,
      context.req.user.id,
    );
    this.pubSub.publish('OrderStatusChange', {
      OrderStatusChange: changedStatus,
    });
    return changedStatus;
  }

  @Subscription((returns) => OrderRecord, {
    filter: (payload, variables) => {
      return payload.OrderStatusChange.id === variables.orderId;
    },
  })
  OrderStatusChange() {
    return this.pubSub.asyncIterator('OrderStatusChange');
  }
}
