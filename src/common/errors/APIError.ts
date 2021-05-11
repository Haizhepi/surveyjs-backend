import { BaseError } from "./BaseError";
import { HttpStatusCode } from "./HttpStatusCode";

class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    description = "internal server error",
    isOperational: boolean = true
  ) {
    super(name, httpCode, description, isOperational);
  }
}
