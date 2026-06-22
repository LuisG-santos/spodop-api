import db from "../../../db/client.js";
import type { User } from "../../../../generated/prisma/client.js";
import { safeUserSelect } from "../../../types/typeUser.js";
export type updateUserDTO = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
};
export class UpdateUserRepository {
  async updateUser(id: string, data: updateUserDTO){
    return db.user.update({
      where: { id },
      select: safeUserSelect,
      data,
    });
  }
}
