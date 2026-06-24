import { UpdateUserController } from "../../controllers/user/updateUser.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { GetUserByPhoneNumberRepository } from "../../repository/prisma/user/getUserByPhoneNumber.js";
import { UpdateUserRepository } from "../../repository/prisma/user/updateUser.js";
import { UpdateUserUseCase } from "../../use-cases/users/updateUser.js";

export const makeUpdateUserController = () => {
  const updateUserRepository = new UpdateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const getUserByPhoneNumberRepository = new GetUserByPhoneNumberRepository();
  const updateUserUseCase = new UpdateUserUseCase(
    getUserByEmailRepository,
    updateUserRepository,
    getUserByPhoneNumberRepository,
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};
