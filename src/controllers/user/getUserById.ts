import type { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../use-cases/users/getuserById.js";

export class GetUserByIdController {
  private getUserByIdUseCase: GetUserByIdUseCase;
  constructor(getUserById: GetUserByIdUseCase) {
    this.getUserByIdUseCase = getUserById;
  }
  async getUser(req: Request, res: Response) {
    try {
      const id = req.user!.sub;

      const getUser = await this.getUserByIdUseCase.getUserById(id);
      if (!getUser) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.status(200).json(getUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
}
