import db from "../../../db/client.js";
import { safeUserSelect } from "../../../types/typeUser.js";

export type CreateUserDTO = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export class CreateUserRepository {
  async create(data: CreateUserDTO) {
    return db.user.create({ 
      data,
      select: safeUserSelect
    });
  }
}
