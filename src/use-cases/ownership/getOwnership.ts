import type { GetOwnershipRepository } from "../../repository/prisma/ownership/getOwnership.js";

export class GetOwnershipUseCase {
  private getOwnershipRepository: GetOwnershipRepository;
  constructor(getOwnershipRepository: GetOwnershipRepository) {
    this.getOwnershipRepository = getOwnershipRepository;
  }
  async getOwnership(userId: string) {
    const ownership = await this.getOwnershipRepository.getOwnership(userId);
    return ownership;
  }
}
