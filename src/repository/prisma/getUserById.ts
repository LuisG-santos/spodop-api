import db from "../../db/client.js";

export class PrismaGetUserByIdRepository {
  async getUserById(id: string) {
    return db.user.findUnique({
      where: { id },
    });
  }
}
