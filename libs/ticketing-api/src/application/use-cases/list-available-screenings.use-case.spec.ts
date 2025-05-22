import { ListAvailableScreeningsUseCase } from './list-available-screenings.use-case';
import { ScreeningRepositoryPort } from '../../domain/ports/screening.repository.port';
import { ListAvailableScreeningsInput } from '../../dtos/list-available-screenings.dto';

describe('ListAvailableScreeningsUseCase', () => {
  let useCase: ListAvailableScreeningsUseCase;
  let mockRepository: jest.Mocked<ScreeningRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      findByDate: jest.fn()
    };

    useCase = new ListAvailableScreeningsUseCase(mockRepository);
  });

  it('should return screenings for the given date', async () => {
    const input: ListAvailableScreeningsInput = { date: '2025-05-15' };
    const expectedOutput = [
      {
        id: '1',
        movieTitle: 'Interstellar',
        startTime: '2025-05-15T18:00:00Z',
        auditorium: 'Auditorium 1'
      }
    ];

    mockRepository.findByDate.mockResolvedValueOnce(expectedOutput);

    const result = await useCase.execute(input);
    expect(mockRepository.findByDate).toHaveBeenCalledWith('2025-05-15');
    expect(result).toEqual(expectedOutput);
  });
});
