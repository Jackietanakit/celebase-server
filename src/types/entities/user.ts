import { UserRole } from "../enum";

export class User {
  uuid?: string;

  email?: string;

  password?: string;

  role?: UserRole;

  isVerify?: boolean;

  verificationCode?: string;
}
