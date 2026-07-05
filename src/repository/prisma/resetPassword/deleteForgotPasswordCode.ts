import db from "../../../db/client.js";

export class DeleteForgotPasswordCode {
  async delete(userId: string) {
    return db.passwordResetToken.delete({
      where: { userId },
    });
  }
}
