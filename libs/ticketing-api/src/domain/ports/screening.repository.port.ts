import { ListAvailableScreeningsOutput } from '../../dtos/list-available-screenings.dto';

export interface ScreeningRepositoryPort {
  findByDate(date: string): Promise<ListAvailableScreeningsOutput[]>;
}
