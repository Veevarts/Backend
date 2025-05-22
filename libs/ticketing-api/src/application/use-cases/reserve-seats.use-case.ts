import { Inject } from '@nestjs/common';
import { ReserveSeatsInput, ReserveSeatsOutput } from '../../dtos/reserve-seats.dto';
import { SeatReservationRepositoryPort } from '../../domain/ports/seat-reservation.repository.port';

export class ReserveSeatsUseCase {
  constructor(
    @Inject('SeatReservationRepository')
    private readonly reservationRepo: SeatReservationRepositoryPort
  ) {}

  async execute(input: ReserveSeatsInput): Promise<ReserveSeatsOutput> {
    return this.reservationRepo.tryReserve(input.screeningId, input.seats);
  }
}
