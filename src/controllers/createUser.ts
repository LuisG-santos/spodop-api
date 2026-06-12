import { PrismaUserRepository } from "../repository/prisma/createUser.js";
import type { Request } from "express";
import { CreateUserUseCase } from "../use-cases/users/createUser.js";
import validator from "validator";
import { badRequest, created, serverError } from "./helpers.js";

export class CreateUserController {
  async create(httpRequest: Request) {
    try {
      const params = httpRequest.body;
      const requiredFields = ["name", "email", "password", "confirmPassword"];
      const { confirmPassword, ...dataUser } = params;

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing field value ${field}` });
        }
      }
      const emailIsValid = validator.isEmail(params.email);

      if (!emailIsValid) {
        return badRequest({
          message: "Invalid e-mail. Please provider a valid one",
        });
      }
      const passwordIsValid = params.password.length < 6;
      if (passwordIsValid) {
        return badRequest({
          message: "Password must be at least 6 characters",
        });
      }
      if (params.password != params.confirmPassword) {
        return badRequest({
          message: "Password must be at least 6 characters",
        });
      }

      const createUserUseCase = new CreateUserUseCase(
        new PrismaUserRepository(),
      );
      const createdUser = await createUserUseCase.create(dataUser);

      return created(createdUser);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
