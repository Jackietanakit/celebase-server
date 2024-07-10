import { HttpException, HttpStatus } from "@nestjs/common";

export class FileException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}

export class DatabaseException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}

export class AuthException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
