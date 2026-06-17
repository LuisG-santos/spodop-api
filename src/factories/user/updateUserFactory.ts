import { UpdateUserController } from "../../controllers/user/updateUser.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { UpdateUserRepository } from "../../repository/prisma/user/updateUser.js";
import { UpdateUserUseCase } from "../../use-cases/users/updateUser.js";

export const makeUpdateUserController = () => {
  return new UpdateUserController(
    new UpdateUserUseCase(new GetUserByEmailRepository(), new UpdateUserRepository()),
  );
};
