import db from "../../db/client.js";
import type { User } from "../../../generated/prisma/client.js";
export class GetUserByPhoneNumber {
  async getPhoneNumber(phoneNumber: string): Promise<User | null>{
    return db.user.findUnique({
      where: { phoneNumber },
    });
  }
}
