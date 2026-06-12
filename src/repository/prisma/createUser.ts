import db from "../../db/client.js";
import type { User } from "../../../generated/prisma/client.js";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export class PrismaUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return db.user.create({ data });
  }

  async findById(id: string): Promise<User | null>{
    return db.user.findUnique({
      where: { id },
    });
  }
}
