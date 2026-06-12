import bcrypt from "bcrypt";
import {
  PrismaUserRepository,
  type CreateUserDTO,
} from "../../repository/prisma/createUser.js";

export class CreateUserUseCase {
  private repository: PrismaUserRepository;
  constructor(prismaUserRepository: PrismaUserRepository) {
    this.repository = prismaUserRepository;
  }
  async create(data: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = {
      ...data,
      password: hashedPassword,
    };
    const createdUser = await this.repository.create(user);
    return createdUser;
  }
}
