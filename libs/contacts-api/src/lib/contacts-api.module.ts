import { Module } from '@nestjs/common';
import { PurchasesController } from '../controllers/v1/purchases.controller';
import { AttachPurchaseToUserUseCase } from '../application/use-cases/attach-purchase.use-case';
import { InMemoryMembershipGateway } from '../infrastructure/gateway/in-memory-membership.gateway';

@Module({
  controllers: [PurchasesController],
  providers: [
    AttachPurchaseToUserUseCase,
    {
      provide: 'UserMembershipPort',
      useClass: InMemoryMembershipGateway,
    },
  ],
})
export class ContactsApiModule {}
