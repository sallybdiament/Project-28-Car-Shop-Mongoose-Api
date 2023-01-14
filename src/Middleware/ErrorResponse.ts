interface IErrorResponse {
  statusCode?: number
  message: string
}

class ErrorResponse extends Error implements IErrorResponse {
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;