export interface MyKnownError {
  errorMessage: string;
  // ...
}

export interface CommandState {
  isLoading: boolean;
  error: string;
}
