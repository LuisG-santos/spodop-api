import type { Request, Response } from "express";
import { CreateUserUseCase } from "../../use-cases/users/createUser.js";
import validator from "validator";
import { AppError } from "../../error/error.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  checkIfPhoneNumberIsValid,
} from "../../helpers/user.js";
import {
  invalidEmailResponse,
  invalidPhoneNumberResponse,
} from "../../helpers/http.js";
import { normalizePhoneNumber } from "../../helpers/phone.js";
export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;
  constructor(createUser: CreateUserUseCase) {
    this.createUserUseCase = createUser;
  }
  async create(req: Request, res: Response) {
    try {
      const params = req.body;
      const requiredFields = [
        "name",
        "email",
        "phoneNumber",
        "password",
        "confirmPassword",
      ];
      const { confirmPassword, ...dataUser } = params;

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return res
            .status(400)
            .json({ message: `Missing field value ${field}` });
        }
      }

      if (!checkIfEmailIsValid(params.email)) {
        return invalidEmailResponse(res);
      }

      const normalizedPhoneNumber = normalizePhoneNumber(params.phoneNumber);

      if (!checkIfPhoneNumberIsValid(normalizedPhoneNumber)) {
        return invalidPhoneNumberResponse(res);
      }

      if (!checkIfPasswordIsValid(params.password)) {
        return invalidPhoneNumberResponse(res);
      }
      if (params.password != params.confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const createdUser = await this.createUserUseCase.create(dataUser);

      return res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res
          .status(error.statusCode)
          .json({
            message: error.message,
            field: error.field,
            code: error.code,
          });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
