import { UpdateUserController } from "../../controllers/user/updateUser.js";
import { GetUserByEmail } from "../../repository/prisma/getUserByEmail.js";
import { UpdateUserRepository } from "../../repository/prisma/updateUser.js";
import { UpdateUserUseCase } from "../../use-cases/users/updateUser.js";

export const makeUpdateUserController = () => {
  return new UpdateUserController(
    new UpdateUserUseCase(new GetUserByEmail(), new UpdateUserRepository()),
  );
};
