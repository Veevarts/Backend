export interface GetScreeningDetailsInput {
    screeningId: string;
  }
  
  export interface GetScreeningDetailsOutput {
    id: string;
    movieTitle: string;
    startTime: string;
    auditorium: string;
    seatMap: string[]; // array of seat labels like ['A1', 'A2', 'B1', ...]
  }
  