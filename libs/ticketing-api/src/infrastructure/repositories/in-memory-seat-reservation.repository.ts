import { Injectable } from '@nestjs/common';
import { SeatReservationRepositoryPort } from '../../domain/ports/seat-reservation.repository.port';
import { ReserveSeatsOutput } from '../../dtos/reserve-seats.dto';

@Injectable()
export class InMemorySeatReservationRepository implements SeatReservationRepositoryPort {
  private reservations: Record<string, Set<string>> = {};

  async tryReserve(screeningId: string, seats: string[]): Promise<ReserveSeatsOutput> {
    const reservedSeats = this.reservations[screeningId] ?? new Set<string>();

    const unavailable = seats.filter(seat => reservedSeats.has(seat));
    const reservable = seats.filter(seat => !reservedSeats.has(seat));

    // Temporarily reserve
    reservable.forEach(seat => reservedSeats.add(seat));
    this.reservations[screeningId] = reservedSeats;

    return {
      reserved: reservable,
      unavailable
    };
  }
}
