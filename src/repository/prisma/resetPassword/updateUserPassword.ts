import db from "../../../db/client.js";

export class UpdateUserPassword {
  async updatePassword(id: string, password: string) {
    return db.user.update({
      where: { id },
      data: { password },
    });
  }
}
