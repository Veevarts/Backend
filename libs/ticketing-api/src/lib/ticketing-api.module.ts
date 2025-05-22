import { Module } from '@nestjs/common';
import { ScreeningsController } from '../controllers/v1/screenings.controller';
import { ListAvailableScreeningsUseCase } from '../application/use-cases/list-available-screenings.use-case';
import { InMemoryScreeningRepository } from '../infrastructure/repositories/in-memory-screening.repository';
import { GetScreeningDetailsUseCase } from '../application/use-cases/get-screening-details.use-case';
import { InMemoryScreeningDetailsRepository } from '../infrastructure/repositories/in-memory-screening-details.repository';
import { ReserveSeatsUseCase } from '../application/use-cases/reserve-seats.use-case';
import { InMemorySeatReservationRepository } from '../infrastructure/repositories/in-memory-seat-reservation.repository';
@Module({
  controllers: [ScreeningsController],
  providers: [
    ListAvailableScreeningsUseCase,
    {
      provide: 'ScreeningRepository',
      useClass: InMemoryScreeningRepository,
    },
    GetScreeningDetailsUseCase,
    {
      provide: 'ScreeningDetailsRepository',
      useClass: InMemoryScreeningDetailsRepository,
    },
    ReserveSeatsUseCase,
    {
      provide: 'SeatReservationRepository',
      useClass: InMemorySeatReservationRepository,
    },
  ],
})
export class TicketingApiModule {}