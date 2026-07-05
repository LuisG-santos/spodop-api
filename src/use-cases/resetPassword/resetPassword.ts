import { AppError } from "../../error/error.js";
import type { DeleteForgotPasswordCode } from "../../repository/prisma/resetPassword/deleteForgotPasswordCode.js";
import type { GetForgotPasswordCodeByUserId } from "../../repository/prisma/resetPassword/getForgotPasswordCodeByUserId.js";
import type { UpdateUserPasswordRepository } from "../../repository/prisma/resetPassword/updateUserPassword.js";
import type { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import bcrypt from "bcrypt";
export class ResetPasswordUseCase {
  private updateUserPasswordRepository: UpdateUserPasswordRepository;
  private getUserByEmailRepository: GetUserByEmailRepository;
  private getForgotPasswordCodeRepository: GetForgotPasswordCodeByUserId;
  private deleteForgotPasswordCodeRepository: DeleteForgotPasswordCode;
  constructor(
    updateUserPassword: UpdateUserPasswordRepository,
    getUserByEmail: GetUserByEmailRepository,
    getForgotPasswordCode: GetForgotPasswordCodeByUserId,
    deleteForgotPasswordCode: DeleteForgotPasswordCode,
  ) {
    this.updateUserPasswordRepository = updateUserPassword;
    this.getUserByEmailRepository = getUserByEmail;
    this.getForgotPasswordCodeRepository = getForgotPasswordCode;
    this.deleteForgotPasswordCodeRepository = deleteForgotPasswordCode;
  }

  async updatePassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.getUserByEmailRepository.getEmail(email);

    if (!user) {
      throw new AppError("Invalid or expired code", 400);
    }

    const userCode = await this.getForgotPasswordCodeRepository.getCode(
      user.id,
    );

    if (!userCode) {
      throw new AppError("Invalid or expired code", 400);
    }

    const expirationCode = new Date() > userCode?.expiresAt;

    if (expirationCode) {
      throw new AppError("Invalid or expired code", 400);
    }

    if (code !== userCode.code) {
      throw new AppError("Invalid or expired code", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.updateUserPasswordRepository.updatePassword(
      userCode.userId,
      hashedPassword,
    );

    await this.deleteForgotPasswordCodeRepository.delete(userCode.userId);
  }
}
