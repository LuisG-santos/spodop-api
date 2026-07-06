import { ResetPasswordController } from "../../controllers/resetPassword/resetPassword.js";
import { DeleteForgotPasswordCodeRepository } from "../../repository/prisma/resetPassword/deleteForgotPasswordCode.js";
import { GetForgotPasswordCodeByUserIdRepository } from "../../repository/prisma/resetPassword/getForgotPasswordCodeByUserId.js";
import { UpdateUserPasswordRepository } from "../../repository/prisma/resetPassword/updateUserPassword.js";
import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import { ResetUserPasswordUseCase } from "../../use-cases/resetPassword/resetPassword.js";

export const makeResetPasswordController = () => {
  const updateUserPasswordRepository = new UpdateUserPasswordRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const getForgotPasswordCode = new GetForgotPasswordCodeByUserIdRepository();
  const deleteForgotPasswordCode = new DeleteForgotPasswordCodeRepository();
  const resetUserPasswordUseCase = new ResetUserPasswordUseCase(
    updateUserPasswordRepository,
    getUserByEmailRepository,
    getForgotPasswordCode,
    deleteForgotPasswordCode,
  );
  const resetPasswordController = new ResetPasswordController(
    resetUserPasswordUseCase,
  );

  return resetPasswordController;
};
