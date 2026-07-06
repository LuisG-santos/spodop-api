import { AppError } from "../../error/error.js";
import type { GetForgotPasswordCodeByUserIdRepository } from "../../repository/prisma/resetPassword/getForgotPasswordCodeByUserId.js";
import type { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
export class VerifyResetPasswordCodeUseCase {
  private getForgotPasswordCodeRepository: GetForgotPasswordCodeByUserIdRepository;
  private getUserByEmailRepository: GetUserByEmailRepository;
  constructor(
    getForgotPasswordCode: GetForgotPasswordCodeByUserIdRepository,
    getUserByEmail: GetUserByEmailRepository,
  ) {
    this.getForgotPasswordCodeRepository = getForgotPasswordCode;
    this.getUserByEmailRepository = getUserByEmail;
  }
  async verifyCode(email: string, code: string): Promise<void> {
    const userId = await this.getUserByEmailRepository.getEmail(email);

    if (!userId) {
      throw new AppError("Invalid or expired code", 400);
    }
    const resetCode = await this.getForgotPasswordCodeRepository.getCode(
      userId.id,
    );

    if (!resetCode) {
      throw new AppError("Invalid or expired code", 400);
    }

    const expirationCode = new Date() > resetCode.expiresAt;

    if (expirationCode) {
      throw new AppError("Invalid or expired code", 400);
    }

    if (code !== resetCode.code) {
      throw new AppError("Invalid or expired code", 400);
    }
  }
}
