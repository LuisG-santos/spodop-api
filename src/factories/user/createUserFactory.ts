import { CreateUserController } from "../../controllers/user/createUser.js";
import { CreateUserRepository } from "../../repository/prisma/user/createUser.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { GetUserByPhoneNumberRepository } from "../../repository/prisma/user/getUserByPhoneNumber.js";
import { CreateUserUseCase } from "../../use-cases/users/createUser.js";

export const makeCreateUserController = () => {
  const createUserRepository = new CreateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const getUserByPhoneNumberRepository = new GetUserByPhoneNumberRepository();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
    getUserByPhoneNumberRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
