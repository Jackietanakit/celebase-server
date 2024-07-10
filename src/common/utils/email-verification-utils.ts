// Will generate the verification code from 100000 to 999999
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 899999).toString();
}
