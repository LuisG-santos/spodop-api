import db from "../../../db/client.js";

export class UpdateUserPasswordRepository {
  async updatePassword(id: string, password: string) {
    return db.user.update({
      where: { id },
      data: { password },
    });
  }
}
