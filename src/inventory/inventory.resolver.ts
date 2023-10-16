import { Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import {
  CreateAdjustmentRecordInput,
  CreatePurchaseRecordInput,
} from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt.guard';

@Resolver('Inventory')
@UseGuards(JWTAuthGuard)
export class InventoryResolver {
  constructor(private inventoryService: InventoryService) {}

  @Query('getPurchaseRecord')
  getPurchaseRecordById(@Args('id') id: string) {
    return this.inventoryService.getPurchasingRecordById(id);
  }

  @Query('getPurchaseRecords')
  getPurchaseRecordList() {
    return this.inventoryService.getAllPurchasingRecord();
  }

  @Query('getAdjustmentRecord')
  getAdjustmentRecordById(@Args('id') id: string) {
    return this.inventoryService.getPurchasingRecordById(id);
  }

  @Query('getAdjustmentRecords')
  getAdjustmentRecordList() {
    return this.inventoryService.getAllPurchasingRecord();
  }

  @Mutation('createPurchaseRecord')
  async createPurchaseRecord(
    @Args('data') args: CreatePurchaseRecordInput,
    @Context() context,
  ) {
    return this.inventoryService.createPurchaseRecord(
      args,
      context.req.user.id,
    );
  }

  @Mutation('createAdjustmentRecord')
  async createAdjustmentRecord(
    @Args('data') args: CreateAdjustmentRecordInput,
    @Context() context,
  ) {
    return this.inventoryService.createAdjustmentRecord(
      args,
      context.req.user.id,
    );
  }
}
