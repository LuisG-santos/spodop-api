import { CreateUserRepository } from "../../repository/prisma/createUser.js";
import type { Request, Response } from "express";
import { CreateUserUseCase } from "../../use-cases/users/createUser.js";
import validator from "validator";
import { AppError } from "../../error/error.js";
import { GetUserByEmail } from "../../repository/prisma/getUserByEmail.js";
import { GetUserByPhoneNumber } from "../../repository/prisma/getUserByPhoneNumber.js";

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase
  constructor(createUser: CreateUserUseCase){
    this.createUserUseCase = createUser
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
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
      const passwordIsInValid = !passwordRegex.test(params.password);
      if (passwordIsInValid) {
        return res
          .status(400)
          .json({
            message:
              "Password must be at least 6 characters, 1 uppercase letter, 1 number and 1 special character.",
          });
      }
      if (params.password != params.confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // const createUserUseCase = new CreateUserUseCase(
      //   new CreateUserRepository(),
      //   new GetUserByEmail(),
      //   new GetUserByPhoneNumber(),
      // );

      // const createdUser = await createUserUseCase.create(dataUser);
      const createdUser = await this.createUserUseCase.create(dataUser)

      return res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
       return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
