export interface UserMembershipPort {
    isActiveMember(userId: string): Promise<boolean>;
  }
  