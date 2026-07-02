import { ForgotPasswordController } from "../../controllers/resetPassword/forgotPassword.js";
import { UpsertForgotPasswordRepository } from "../../repository/prisma/resetPassword/upsertForgotPassword.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { ForgotPasswordUseCase } from "../../use-cases/resetPassword/resetPassword.js";

export const makeForgotPasswordController = () => {
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const upsertForgotPasswordRepository = new UpsertForgotPasswordRepository();
  const forgotPasswordUseCase = new ForgotPasswordUseCase(
    getUserByEmailRepository,
    upsertForgotPasswordRepository,
  );
  const forgotPasswordController = new ForgotPasswordController(
    forgotPasswordUseCase,
  );

  return forgotPasswordController;
};
