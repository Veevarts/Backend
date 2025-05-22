import { Injectable } from '@nestjs/common';
import { PaymentGatewayPort } from '../../domain/ports/payment-gateway.port';
import { CreatePaymentInput, CreatePaymentOutput } from '../../dtos/create-payment.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class MockPaymentGateway implements PaymentGatewayPort {
  async charge(input: CreatePaymentInput): Promise<CreatePaymentOutput> {
    const success = input.amount > 0;

    return {
      paymentId: randomUUID(),
      success
    };
  }
}