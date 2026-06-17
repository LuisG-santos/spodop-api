import db from "../../../db/client.js";
import type { User } from "../../../../generated/prisma/client.js";

export type CreateUserDTO = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export class CreateUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return db.user.create({ data });
  }
}
