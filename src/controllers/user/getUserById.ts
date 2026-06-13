import type { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../use-cases/users/getuserById.js";
import { PrismaGetUserByIdRepository } from "../../repository/prisma/getUserById.js";

export class GetUserByIdController {
  async getUser(request: Request<{ id: string }>, res: Response) {
    try {
      const { id } = request.params;
      if (!id) {
        return res.status(400).json({message: "id param is missing"});
      }

      const getUserByIdUseCase = new GetUserByIdUseCase(
        new PrismaGetUserByIdRepository(),
      );

      const getUser = await getUserByIdUseCase.getUserById(id);
      if (!getUser) {
        return res.status(404).json({message: "user not found"});
      }
      res.status(200).json(getUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "internal server error"});
    }
  }
}
