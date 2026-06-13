import { PrismaUserRepository } from "../../repository/prisma/createUser.js";
import type { Request, Response } from "express";
import { CreateUserUseCase } from "../../use-cases/users/createUser.js";
import validator from "validator";
import { AppError } from "../../error/error.js";

export class CreateUserController {
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
      const emailIsValid = validator.isEmail(params.email);

      if (!emailIsValid) {
        return res
          .status(400)
          .json({ message: "Invalid e-mail. Please provider a valid one" });
      }
      const phoneNumberIsValid = validator.isMobilePhone(
        params.phoneNumber,
        "pt-BR",
      );
      if (!phoneNumberIsValid) {
        return res
          .status(400)
          .json({ message: "Phone number format is not valid" });
      }
      const passwordIsValid = params.password.length < 6;
      if (passwordIsValid) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }
      if (params.password != params.confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const createUserUseCase = new CreateUserUseCase(
        new PrismaUserRepository(),
      );
      const createdUser = await createUserUseCase.create(dataUser);

      return res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
