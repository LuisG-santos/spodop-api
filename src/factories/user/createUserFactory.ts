import { CreateUserController } from "../../controllers/user/createUser.js";
import { CreateUserRepository } from "../../repository/prisma/user/createUser.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { GetUserByPhoneNumberRepository } from "../../repository/prisma/user/getUserByPhoneNumber.js";
import { CreateUserUseCase } from "../../use-cases/users/createUser.js";

export const makeCreateUserController = () => {
  return new CreateUserController(
    new CreateUserUseCase(
      new CreateUserRepository(),
      new GetUserByEmailRepository(),
      new GetUserByPhoneNumberRepository(),
    ),
  );
};
