import type { Request, Response } from "express";
import type { GetOwnershipUseCase } from "../../use-cases/ownership/getOwnership.js";

export class GetOwnershipController {
  private getOwnershipUseCase: GetOwnershipUseCase;
  constructor(getOwnershipUseCase: GetOwnershipUseCase) {
    this.getOwnershipUseCase = getOwnershipUseCase;
  }
  async getOwnership(req: Request, res: Response){
    try{
        const userId = req.user!.sub
        const ownership = await this.getOwnershipUseCase.getOwnership(userId)

        return res.status(200).json(ownership)
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
  }
}
