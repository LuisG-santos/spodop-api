import { GetOwnershipController } from "../../controllers/ownership/getOwnership.js";
import { GetOwnershipRepository } from "../../repository/prisma/ownership/getOwnership.js";
import { GetOwnershipUseCase } from "../../use-cases/ownership/getOwnership.js";

export const makeGetOwnershipController = () => {
  const getOwnershipRepository = new GetOwnershipRepository();
  const getOwnershipUseCase = new GetOwnershipUseCase(getOwnershipRepository);
  const getOwnershipController = new GetOwnershipController(
    getOwnershipUseCase,
  );
  return getOwnershipController;
};
