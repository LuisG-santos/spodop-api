import type { Request, Response } from "express";
import validator from "validator";
import { UpdateUserUseCase } from "../../use-cases/users/updateUser.js";
import { GetUserByEmail } from "../../repository/prisma/user/getUserByEmail.js";
import { UpdateUserRepository } from "../../repository/prisma/user/updateUser.js";
import { AppError } from "../../error/error.js";
export class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase;
  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }
  async updateUser(req: Request<{ id: string }>, res: Response) {
    try {
      const updateUserParams = req.body;
      const userId = req.params.id;

      const idIsValid = validator.isUUID(userId);

      if (!idIsValid) {
        return res.status(400).json({ message: "Id is not valid" });
      }
      const allowedFields = ["name", "email", "phoneNumber", "password"];

      const someFieldsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field),
      );
      if (someFieldsNotAllowed) {
        return res
          .status(400)
          .json({ message: "Some provided field is not allowed" });
      }

      if (updateUserParams.password) {
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;

        const passwordIsInValid = !passwordRegex.test(
          updateUserParams.password,
        );

        if (passwordIsInValid) {
          return res.status(400).json({
            message:
              "Password must be at least 6 characters, 1 uppercase letter, 1 number and 1 special character.",
          });
        }
      }

      if (updateUserParams.email) {
        const emailIsValid = validator.isEmail(updateUserParams.email);

        if (!emailIsValid) {
          return res
            .status(400)
            .json({ message: "Invalid e-mail. Please provider a valid one" });
        }
      }

      const updatedUser = await this.updateUserUseCase.updateUser(
        userId,
        updateUserParams,
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
