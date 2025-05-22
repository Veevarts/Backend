import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningsController } from './screenings.controller';
import { ListAvailableScreeningsUseCase } from '../../application/use-cases/list-available-screenings.use-case';
import { ListAvailableScreeningsOutput } from '../../dtos/list-available-screenings.dto';

describe('ScreeningsController', () => {
  let controller: ScreeningsController;
  let useCase: ListAvailableScreeningsUseCase;

  beforeEach(async () => {
    const mockUseCase = {
      execute: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreeningsController],
      providers: [
        {
          provide: ListAvailableScreeningsUseCase,
          useValue: mockUseCase,
        }
      ]
    }).compile();

    controller = module.get<ScreeningsController>(ScreeningsController);
    useCase = module.get(ListAvailableScreeningsUseCase);
  });

  it('should call use case with correct date and return data', async () => {
    const mockOutput: ListAvailableScreeningsOutput[] = [
      { id: '1', movieTitle: 'Dune', startTime: '2025-07-01T20:00:00Z', auditorium: 'A' }
    ];
    (useCase.execute as jest.Mock).mockResolvedValue(mockOutput);

    const result = await controller.list('2025-07-01');

    expect(useCase.execute).toHaveBeenCalledWith({ date: '2025-07-01' });
    expect(result).toEqual(mockOutput);
  });
});
