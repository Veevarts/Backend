import { Controller, Post, Body } from '@nestjs/common';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import { CreatePaymentInput, CreatePaymentOutput } from '../../dtos/create-payment.dto';

@Controller('v1/payments')
export class PaymentsController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) {}

  @Post()
  async create(@Body() input: CreatePaymentInput): Promise<CreatePaymentOutput> {
    return this.createPaymentUseCase.execute(input);
  }
}
