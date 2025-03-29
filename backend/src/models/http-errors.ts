class HttpErrors extends Error {
  constructor(message: string, errorCode: number) {
    super(message);
  }
}
