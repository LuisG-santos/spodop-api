import { CreateUserController } from "../../controllers/user/createUser.js";
import { CreateUserRepository } from "../../repository/prisma/createUser.js";
import { GetUserByEmail } from "../../repository/prisma/getUserByEmail.js";
import { GetUserByPhoneNumber } from "../../repository/prisma/getUserByPhoneNumber.js";
import { CreateUserUseCase } from "../../use-cases/users/createUser.js";

export const makeCreateUserController = () => {
  return new CreateUserController(
    new CreateUserUseCase(
      new CreateUserRepository(),
      new GetUserByEmail(),
      new GetUserByPhoneNumber(),
    ),
  );
};
