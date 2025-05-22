export interface AttachPurchaseInput {
    userId: string;
    purchaseId: string;
    itemType: 'ticket' | 'membership';
    amount: number;
  }
  
  export interface AttachPurchaseOutput {
    userId: string;
    purchaseId: string;
    benefitsApplied: boolean;
  }
  