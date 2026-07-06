import { VerifyResetPasswordCodeController } from "../../controllers/resetPassword/verifyResetPasswordCode.js";
import { GetForgotPasswordCodeByUserIdRepository } from "../../repository/prisma/resetPassword/getForgotPasswordCodeByUserId.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { VerifyResetPasswordCodeUseCase } from "../../use-cases/resetPassword/verifyResetPasswordCode.js";

export const makeVerifyResetPasswordCodeController = () => {
  const getForgotPasswordCode = new GetForgotPasswordCodeByUserIdRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const verifyResetPasswordUseCase = new VerifyResetPasswordCodeUseCase(
    getForgotPasswordCode,
    getUserByEmailRepository,
  );
  const verifyResetPasswordCodeController =
    new VerifyResetPasswordCodeController(verifyResetPasswordUseCase);

  return verifyResetPasswordCodeController;
};
