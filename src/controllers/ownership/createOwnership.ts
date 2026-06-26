import type { Request, Response } from "express";
import type { CreateOwnershipUseCase } from "../../use-cases/ownership/createOwnership.js";
import { AppError } from "../../error/error.js";
import {
  checkIfCoordIsValid,
  checkIfNameIsValid,
  checkIfTotalAreaIsValid,
} from "../../helpers/ownership.js";

export class CreateOwnershipController {
  private createOwnershipUseCase: CreateOwnershipUseCase;
  constructor(createOwnership: CreateOwnershipUseCase) {
    this.createOwnershipUseCase = createOwnership;
  }

  async create(req: Request, res: Response) {
    try {
      const userId = req.user!.sub;
      const params = req.body;

      if (!params.name) {
        return res.status(400).json({ message: "Missing field name" });
      }

      if (!checkIfNameIsValid(params.name)) {
        return res
          .status(400)
          .json({ message: "Name must me least 4 characters" });
      }

      if (params.totalArea === undefined || params.totalArea === null) {
        return res.status(400).json({ message: "Missing field totalArea" });
      }

      if (!checkIfTotalAreaIsValid(params.totalArea)) {
        return res
          .status(400)
          .json({ message: "The total area must be a number." });
      }

      if (params.totalArea <= 0) {
        return res
          .status(400)
          .json({ message: "Total area must be greater than 0" });
      }

      if (
        params.longitude !== undefined &&
        !checkIfCoordIsValid(params.longitude)
      ) {
        return res
          .status(400)
          .json({ message: "The longitude must be a number" });
      }

      if (
        params.latitude !== undefined &&
        !checkIfCoordIsValid(params.latitude)
      ) {
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
