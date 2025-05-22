import { GetScreeningDetailsOutput } from '../../dtos/get-screening-details.dto';

export interface ScreeningDetailsRepositoryPort {
  getById(screeningId: string): Promise<GetScreeningDetailsOutput | null>;
}
