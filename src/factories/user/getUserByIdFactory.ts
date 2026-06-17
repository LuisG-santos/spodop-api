import { GetUserByIdController } from "../../controllers/user/getUserById.js";
import { GetUserByIdRepository } from "../../repository/prisma/user/getUserById.js";
import { GetUserByIdUseCase } from "../../use-cases/users/getuserById.js";

export const makeGetUserByIdController = () => {
  return new GetUserByIdController(
    new GetUserByIdUseCase(new GetUserByIdRepository()),
  );
};
