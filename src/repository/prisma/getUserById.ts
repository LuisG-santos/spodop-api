import db from "../../db/client.js";
import type { User } from "../../../generated/prisma/client.js";

export class PrismaGetUserByIdRepository {
  async getUserById(id: string):Promise<User | null> {
    return db.user.findUnique({
      where: { id },
    });
  }
}
