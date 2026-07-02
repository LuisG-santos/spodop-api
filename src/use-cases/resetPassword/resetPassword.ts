import { AppError } from "../../error/error.js";
import { sendResetPassworEmail } from "../../mail/sendResetPasswordEmail.js";
import type { UpsertForgotPasswordRepository } from "../../repository/prisma/resetPassword/upsertForgotPassword.js";
import type { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import crypto from "crypto";

export class ForgotPasswordUseCase {
  private getUserByEmail: GetUserByEmailRepository;
  private upsertForgotPassword: UpsertForgotPasswordRepository;
  constructor(
    getUserByEmail: GetUserByEmailRepository,
    upsertForgotPassword: UpsertForgotPasswordRepository,
  ) {
    this.getUserByEmail = getUserByEmail;
    this.upsertForgotPassword = upsertForgotPassword;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.getUserByEmail.getEmail(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const bytes = crypto.randomBytes(6);

    const code = Array.from(
      bytes,
      (byte) => charset[byte % charset.length],
    ).join("");

    const timestamp = Date.now() + 3 * 60 * 1000;

    const expirationTime = new Date(timestamp);

    const saveCode = await this.upsertForgotPassword.upsert(
      user.id,
      code,
      expirationTime,
    );

    await sendResetPassworEmail(email, saveCode.code, user.name);
  }
}
