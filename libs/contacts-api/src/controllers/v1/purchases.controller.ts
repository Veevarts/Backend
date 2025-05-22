import { Controller, Post, Body } from '@nestjs/common';
import { AttachPurchaseToUserUseCase } from '../../application/use-cases/attach-purchase.use-case';
import { AttachPurchaseInput, AttachPurchaseOutput } from '../../dtos/attach-purchase.dto';

@Controller('v1/purchases')
export class PurchasesController {
  constructor(private readonly attachPurchase: AttachPurchaseToUserUseCase) {}

  @Post('attach')
  async attach(@Body() input: AttachPurchaseInput): Promise<AttachPurchaseOutput> {
    return this.attachPurchase.execute(input);
  }
}