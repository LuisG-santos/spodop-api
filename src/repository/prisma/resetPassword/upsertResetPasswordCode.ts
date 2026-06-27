import db from "../../../db/client.js";

export class ResetPasswordRepository {
  async upsert(userId: string, code: string, expiresAt: Date) {
    return db.passwordResetToken.upsert({
      where: { userId },
      create: {
        userId,
        code,
        expiresAt,
      },
      update: { code },
    });
  }
}
