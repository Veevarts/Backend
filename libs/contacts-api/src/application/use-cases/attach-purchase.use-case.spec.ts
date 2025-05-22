import { Test, TestingModule } from '@nestjs/testing';
import { AttachPurchaseToUserUseCase } from './attach-purchase.use-case';
import { UserMembershipPort } from '../../domain/ports/user-membership.port';
import {
  AttachPurchaseInput,
  AttachPurchaseOutput,
} from '../../dtos/attach-purchase.dto';

describe('AttachPurchaseToUserUseCase', () => {
  let useCase: AttachPurchaseToUserUseCase;
  let membershipPortMock: jest.Mocked<UserMembershipPort>;

  beforeEach(async () => {
    membershipPortMock = {
      isActiveMember: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttachPurchaseToUserUseCase,
        {
          provide: 'UserMembershipPort',
          useValue: membershipPortMock,
        },
      ],
    }).compile();

    useCase = module.get<AttachPurchaseToUserUseCase>(
      AttachPurchaseToUserUseCase
    );
  });

  it('should apply benefits when user is an active member and item type is ticket', async () => {
    membershipPortMock.isActiveMember.mockResolvedValue(true);

    const input: AttachPurchaseInput = {
      userId: 'user123',
      purchaseId: 'purchase123',
      itemType: 'ticket',
      amount: 100,
    };

    const expectedOutput: AttachPurchaseOutput = {
      userId: 'user123',
      purchaseId: 'purchase123',
      benefitsApplied: true,
    };

    const result = await useCase.execute(input);

    expect(membershipPortMock.isActiveMember).toHaveBeenCalledWith('user123');
    expect(result).toEqual(expectedOutput);
  });

  it('should not apply benefits when user is not an active member', async () => {
    membershipPortMock.isActiveMember.mockResolvedValue(false);

    const input: AttachPurchaseInput = {
      userId: 'user123',
      purchaseId: 'purchase123',
      itemType: 'ticket',
      amount: 100,
    };

    const expectedOutput: AttachPurchaseOutput = {
      userId: 'user123',
      purchaseId: 'purchase123',
      benefitsApplied: false,
    };

    const result = await useCase.execute(input);

    expect(membershipPortMock.isActiveMember).toHaveBeenCalledWith('user123');
    expect(result).toEqual(expectedOutput);
  });

  it('should not apply benefits when item type is not ticket', async () => {
    membershipPortMock.isActiveMember.mockResolvedValue(true);

    const input: AttachPurchaseInput = {
      userId: 'user123',
      purchaseId: 'purchase123',
      itemType: 'membership',
      amount: 100,
    };

    const expectedOutput: AttachPurchaseOutput = {
      userId: 'user123',
      purchaseId: 'purchase123',
      benefitsApplied: false,
    };

    const result = await useCase.execute(input);

    expect(membershipPortMock.isActiveMember).toHaveBeenCalledWith('user123');
    expect(result).toEqual(expectedOutput);
  });
});
