import { Inject } from '@nestjs/common';
import { AttachPurchaseInput, AttachPurchaseOutput } from '../../dtos/attach-purchase.dto';
import { UserMembershipPort } from '../../domain/ports/user-membership.port';

export class AttachPurchaseToUserUseCase {
  private readonly benefitMultiplier = 0.9;

  constructor(
    @Inject('UserMembershipPort')
    private readonly membershipPort: UserMembershipPort
  ) {}

  async execute(input: AttachPurchaseInput): Promise<AttachPurchaseOutput> {
    const isMember = await this.membershipPort.isActiveMember(input.userId);

    // Simulación: si es miembro, se aplica beneficio (por ahora solo se marca)
    const benefitsApplied = isMember && input.itemType === 'ticket';

    // Guardar en una base de datos real o temporal (omisión aquí)
    console.log(`[CONTACTS] Attached purchase ${input.purchaseId} to user ${input.userId}`);

    return {
      userId: input.userId,
      purchaseId: input.purchaseId,
      benefitsApplied
    };
  }
}
