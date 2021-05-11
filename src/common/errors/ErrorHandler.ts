import { BaseError } from "./BaseError";
import * as winston from "winston";

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    winston.error(
      "Error message from the centralized error-handling component",
      err
    );
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
