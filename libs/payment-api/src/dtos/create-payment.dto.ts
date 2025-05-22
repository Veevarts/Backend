export interface CreatePaymentInput {
    userId: string;
    amount: number;
    description: string;
  }
  
  export interface CreatePaymentOutput {
    paymentId: string;
    success: boolean;
  }
  