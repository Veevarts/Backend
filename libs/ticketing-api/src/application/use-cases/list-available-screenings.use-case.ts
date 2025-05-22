import { Inject } from '@nestjs/common';
import { ScreeningRepositoryPort } from '../../domain/ports/screening.repository.port';
import {
  ListAvailableScreeningsInput,
  ListAvailableScreeningsOutput,
} from '../../dtos/list-available-screenings.dto';

export class ListAvailableScreeningsUseCase {
  constructor(
    @Inject('ScreeningRepository')
    private readonly screeningRepo: ScreeningRepositoryPort
  ) {}

  async execute(
    input: ListAvailableScreeningsInput
  ): Promise<ListAvailableScreeningsOutput[]> {
    return this.screeningRepo.findByDate(input.date);
  }
}
