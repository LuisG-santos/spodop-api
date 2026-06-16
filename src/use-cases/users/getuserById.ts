import { GetUserByIdRepository } from "../../repository/prisma/getUserById.js";

export class GetUserByIdUseCase {
  private repository: GetUserByIdRepository;
  constructor(prismaGetUserRepository: GetUserByIdRepository) {
    this.repository = prismaGetUserRepository;
  }
  async getUserById(id: string) {
    const getUser = await this.repository.getUserById(id);

    return getUser;
  }
}
