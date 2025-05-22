import { ReserveSeatsOutput } from '../../dtos/reserve-seats.dto';

export interface SeatReservationRepositoryPort {
  tryReserve(screeningId: string, seats: string[]): Promise<ReserveSeatsOutput>;
}
