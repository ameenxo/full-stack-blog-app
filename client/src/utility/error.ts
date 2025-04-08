export class ApiError extends Error {
  status: boolean;

  constructor(message: string, status: boolean) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
