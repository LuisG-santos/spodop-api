export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public field?: string 
  ) {
    super(message);
    this.name = "AppError";
  }
}
