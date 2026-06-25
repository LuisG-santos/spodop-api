import { LoginController } from "../../controllers/auth/login.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { LoginUseCase } from "../../use-cases/auth/login.js";

export const makeLoginController = () => {
  const secretKey = process.env.JWT_SECRET_KEY!;
  
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const loginUseCase = new LoginUseCase(getUserByEmailRepository, secretKey);
  const loginController = new LoginController(loginUseCase)

  return loginController;
};
