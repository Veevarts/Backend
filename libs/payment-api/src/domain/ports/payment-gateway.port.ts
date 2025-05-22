import { CreatePaymentInput, CreatePaymentOutput } from '../../dtos/create-payment.dto';

export interface PaymentGatewayPort {
  charge(input: CreatePaymentInput): Promise<CreatePaymentOutput>;
}
