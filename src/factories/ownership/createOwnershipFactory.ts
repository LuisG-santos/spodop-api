import { CreateOwnershipController } from "../../controllers/ownership/createOwnership.js";
import { CreateOwnershipRepository } from "../../repository/prisma/ownership/createOwnership.js";
import { CreateOwnershipUseCase } from "../../use-cases/ownership/createOwnership.js";

export const makeCreateOwnershipController = () => {
  const createOwnershipRepository = new CreateOwnershipRepository();
  const createOwnershipUseCase = new CreateOwnershipUseCase(
    createOwnershipRepository,
  );
  const createOwnershipController = new CreateOwnershipController(
    createOwnershipUseCase,
  );

  return createOwnershipController;
};
