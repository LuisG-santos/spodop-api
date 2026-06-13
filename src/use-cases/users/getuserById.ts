import { PrismaGetUserByIdRepository } from "../../repository/prisma/getUserById.js";

export class GetUserByIdUseCase {
  private repository: PrismaGetUserByIdRepository;
  constructor(prismaGetUserRepository: PrismaGetUserByIdRepository) {
    this.repository = prismaGetUserRepository;
  }
  async getUserById(id: string) {
    const getUser = await this.repository.getUserById(id);

    return getUser;
  }
}
