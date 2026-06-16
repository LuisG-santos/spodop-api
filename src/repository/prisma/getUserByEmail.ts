import db from "../../db/client.js";
import type { User } from "../../../generated/prisma/client.js";
export class GetUserByEmail {
  async getEmail(email: string):Promise<User | null> {
    return await db.user.findUnique({
      where: { email },
    });
  }
}
