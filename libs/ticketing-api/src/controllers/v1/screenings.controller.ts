import { Controller, Get, Query, Param } from '@nestjs/common';
import { ListAvailableScreeningsUseCase } from '../../application/use-cases/list-available-screenings.use-case';
import { ListAvailableScreeningsInput, ListAvailableScreeningsOutput } from '../../dtos/list-available-screenings.dto';
import { GetScreeningDetailsUseCase } from '../../application/use-cases/get-screening-details.use-case';
import { GetScreeningDetailsOutput } from '../../dtos/get-screening-details.dto';


@Controller('v1/screenings')
export class ScreeningsController {
  constructor(
    private readonly listAvailableScreeningsUseCase: ListAvailableScreeningsUseCase,
    private readonly getScreeningDetailsUseCase: GetScreeningDetailsUseCase
  ) {}

  @Get()
  async list(@Query('date') date: string): Promise<ListAvailableScreeningsOutput[]> {
    const input: ListAvailableScreeningsInput = { date };
    return this.listAvailableScreeningsUseCase.execute(input);
  }

  @Get(':id')
  async getDetails(@Param('id') screeningId: string): Promise<GetScreeningDetailsOutput | null> {
    return this.getScreeningDetailsUseCase.execute({ screeningId });
  }
}
