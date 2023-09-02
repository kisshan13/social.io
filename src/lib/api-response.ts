class ApiResponse {
  message?: string;
  statusCode: number;
  data?: any;
  success?: boolean;
  stack?: any;

  constructor(message: string, statusCode: number, data: any, stack?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
    if (stack) {
      this.stack = stack;
    }
  }
}

export default ApiResponse;
