import db from "../../db/client.js";
import type { User } from "../../../generated/prisma/client.js";
export type updateUserDTO = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
};
export class UpdateUserRepository {
  async updateUser(id: string, data: updateUserDTO): Promise<User> {
    return db.user.update({
      where: { id },
      data,
    });
  }
}
