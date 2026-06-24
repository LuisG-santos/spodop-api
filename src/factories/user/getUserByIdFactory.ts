import { GetUserByIdController } from "../../controllers/user/getUserById.js";
import { GetUserByIdRepository } from "../../repository/prisma/user/getUserById.js";
import { GetUserByIdUseCase } from "../../use-cases/users/getuserById.js";

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new GetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
};
