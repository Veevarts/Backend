export interface ListAvailableScreeningsInput {
  date: string; // Format: YYYY-MM-DD
}

export interface ListAvailableScreeningsOutput {
  id: string;
  movieTitle: string;
  startTime: string;
  auditorium: string;
}
