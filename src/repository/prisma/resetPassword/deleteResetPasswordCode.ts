import db from "../../../db/client.js";

export class DeleteResetPasswordCode {
  async delete(userId: string) {
    return db.passwordResetToken.delete({
      where: { userId },
    });
  }
}
