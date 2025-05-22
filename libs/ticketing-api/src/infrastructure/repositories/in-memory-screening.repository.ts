import { Injectable } from '@nestjs/common';
import { ScreeningRepositoryPort } from '../../domain/ports/screening.repository.port';
import { ListAvailableScreeningsOutput } from '../../dtos/list-available-screenings.dto';

@Injectable()
export class InMemoryScreeningRepository implements ScreeningRepositoryPort {
  private screenings: ListAvailableScreeningsOutput[] = [
    {
      id: '1',
      movieTitle: 'Interstellar',
      startTime: '2025-05-15T18:00:00Z',
      auditorium: 'Auditorium 1',
    },
    {
      id: '2',
      movieTitle: 'Inception',
      startTime: '2025-05-15T21:00:00Z',
      auditorium: 'Auditorium 2',
    },
  ];

  async findByDate(date: string): Promise<ListAvailableScreeningsOutput[]> {
    return this.screenings.filter(s => s.startTime.startsWith(date));
  }
}
