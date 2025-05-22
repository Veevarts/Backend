import { Injectable } from '@nestjs/common';
import { UserMembershipPort } from '../../domain/ports/user-membership.port';

@Injectable()
export class InMemoryMembershipGateway implements UserMembershipPort {
  private members = new Set<string>(['user-123', 'user-456']);

  async isActiveMember(userId: string): Promise<boolean> {
    return this.members.has(userId);
  }
}
