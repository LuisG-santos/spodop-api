import { LoginController } from "../../controllers/auth/login.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { LoginUseCase } from "../../use-cases/auth/login.js";

export const makeLoginController = () => {
  const secretKey = process.env.JWT_SECRET_KEY!;
  return new LoginController(
    new LoginUseCase(new GetUserByEmailRepository(), secretKey),
  );
};
