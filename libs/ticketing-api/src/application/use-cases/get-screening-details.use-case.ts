import { Inject } from '@nestjs/common';
import { ScreeningDetailsRepositoryPort } from '../../domain/ports/screening-details.repository.port';
import { GetScreeningDetailsInput, GetScreeningDetailsOutput } from '../../dtos/get-screening-details.dto';

export class GetScreeningDetailsUseCase {
  constructor(
    @Inject('ScreeningDetailsRepository')
    private readonly repo: ScreeningDetailsRepositoryPort,
  ) {}

  async execute(input: GetScreeningDetailsInput): Promise<GetScreeningDetailsOutput | null> {
    return this.repo.getById(input.screeningId);
  }
}
