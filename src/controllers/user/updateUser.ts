import type { Request, Response } from "express";
import { UpdateUserUseCase } from "../../use-cases/users/updateUser.js";
import { AppError } from "../../error/error.js";
import {
  checkIfEmailIsValid,
  checkIfIdIsValid,
  checkIfPasswordIsValid,
  checkIfPhoneNumberIsValid,
} from "../../helpers/user.js";
import {
  invalidEmailResponse,
  invalidPasswordResponse,
  invalidPhoneNumberResponse,
  internalErrorResponse
} from "../../helpers/http.js";
import { normalizePhoneNumber } from "../../helpers/phone.js";
export class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase;
  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }
  async updateUser(req: Request, res: Response) {
    try {
      const params = req.body;
      const userId = req.user!.sub;

      if (!checkIfIdIsValid(userId)) {
        return res.status(400).json({ message: "Id is not valid" });
      }
      const allowedFields = ["name", "email", "phoneNumber", "password"];

      const someFieldsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldsNotAllowed) {
        return res
          .status(400)
          .json({ message: "Some provided field is not allowed" });
      }

      if (params.email) {
        if (!checkIfEmailIsValid(params.email)) {
          return invalidEmailResponse(res);
        }
      }

      if (params.phoneNumber) {
        const normalizedPhoneNumber = normalizePhoneNumber(params.phoneNumber);
        if (!checkIfPhoneNumberIsValid(normalizedPhoneNumber)) {
          return invalidPhoneNumberResponse(res);
        }
      }

      if (params.password) {
        if (!checkIfPasswordIsValid(params.password)) {
          return invalidPasswordResponse(res);
        }
      }

      const updatedUser = await this.updateUserUseCase.updateUser(
        userId,
        params,
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return internalErrorResponse(res);
    }
  }
}
