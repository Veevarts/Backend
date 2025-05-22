export interface ReserveSeatsInput {
    screeningId: string;
    seats: string[];
  }
  
  export interface ReserveSeatsOutput {
    reserved: string[];
    unavailable: string[];
  }
  