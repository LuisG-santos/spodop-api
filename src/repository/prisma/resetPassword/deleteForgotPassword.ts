import db from "../../../db/client.js";

export class ForgotPasswordCode {
  async delete(userId: string) {
    return db.passwordResetToken.delete({
      where: { userId },
    });
  }
}
