import { Module } from '@nestjs/common';
import { PaymentsController } from '../controllers/v1/payments.controller';
import { CreatePaymentUseCase } from '../application/use-cases/create-payment.use-case';
import { MockPaymentGateway } from '../infrastructure/gateway/mock-payment-gateway';

@Module({
  controllers: [PaymentsController],
  providers: [
    CreatePaymentUseCase,
    {
      provide: 'PaymentGateway',
      useClass: MockPaymentGateway,
    },
  ],
})
export class PaymentApiModule {}
