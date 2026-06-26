import type { Request, Response } from "express";
import type { CreateOwnershipUseCase } from "../../use-cases/ownership/createOwnership.js";
import { AppError } from "../../error/error.js";

export class CreateOwnershipController {
  private createOwnershipUseCase: CreateOwnershipUseCase;
  constructor(createOwnership: CreateOwnershipUseCase) {
    this.createOwnershipUseCase = createOwnership;
  }

  async create(req: Request, res: Response) {
    try {
      const userId = req.user!.sub;
      const params = req.body;

      if (!params.name || params.name.trim().length === 0) {
        return res.status(400).json({ message: "Missing field value name" });
      }

      if (params.name.length < 4) {
        return res
          .status(400)
          .json({ message: "Name must me least 4 characters" });
      }

      if (params.totalArea === undefined || params.totalArea === null) {
        return res
          .status(400)
          .json({ message: "Missing field value total area" });
      }

      if (typeof params.totalArea !== "number") {
        return res
          .status(400)
          .json({ message: "The total area must be a number." });
      }

      if (params.longitude !== undefined && typeof params.longitude !== "number") {
        return res
          .status(400)
          .json({ message: "The longitude must be a number" });
      }

      if (params.latitude !== undefined && typeof params.latitude !== "number") {
        return res
          .status(400)
          .json({ message: "The latitude must be a number" });
      }

      const createOwnership = await this.createOwnershipUseCase.create(
        userId,
        params,
      );

      return res.status(201).json(createOwnership);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.log(error);

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
