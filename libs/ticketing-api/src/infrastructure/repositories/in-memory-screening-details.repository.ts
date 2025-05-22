import { Injectable } from '@nestjs/common';
import { ScreeningDetailsRepositoryPort } from '../../domain/ports/screening-details.repository.port';
import { GetScreeningDetailsOutput } from '../../dtos/get-screening-details.dto';

@Injectable()
export class InMemoryScreeningDetailsRepository implements ScreeningDetailsRepositoryPort {
  private readonly data: GetScreeningDetailsOutput[] = [
    {
      id: '1',
      movieTitle: 'Dune',
      startTime: '2025-07-01T20:00:00Z',
      auditorium: 'Auditorium A',
      seatMap: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'],
    },
  ];

  async getById(id: string): Promise<GetScreeningDetailsOutput | null> {
    return this.data.find(screening => screening.id === id) ?? null;
  }
}
