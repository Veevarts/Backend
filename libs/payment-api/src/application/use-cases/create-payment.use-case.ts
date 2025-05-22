import { Inject } from '@nestjs/common';
import { CreatePaymentInput, CreatePaymentOutput } from '../../dtos/create-payment.dto';
import { PaymentGatewayPort } from '../../domain/ports/payment-gateway.port';

export class CreatePaymentUseCase {
  constructor(
    @Inject('PaymentGateway')
    private readonly gateway: PaymentGatewayPort
  ) {}

  async execute(input: CreatePaymentInput): Promise<CreatePaymentOutput> {
    return this.gateway.charge(input);
  }
}