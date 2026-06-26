import { AppError } from "../../error/error.js";
import type { CreateOwnershipDTO, CreateOwnershipRepository } from "../../repository/prisma/ownership/createOwnership.js";

export class CreateOwnershipUseCase{
    private createOwnershipRepository: CreateOwnershipRepository
    constructor(createOwnership: CreateOwnershipRepository){
        this.createOwnershipRepository = createOwnership
    }

    async create(userId: string,data: CreateOwnershipDTO){

        if(!userId){
            throw new AppError("Invalid user", 401)
        }

        const ownership ={
            ...data,
            userId
        }

        const createOwnership = await this.createOwnershipRepository.create(ownership)
        return createOwnership
    }
}