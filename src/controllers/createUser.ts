import { PrismaUserRepository, type CreateUserDTO } from "../repository/prisma/createUser.js";
import type { Request, Response } from "express";
import { CreateUserUseCase } from "../use-cases/users/createUser.js";
export class CreateUserController {
  async create(httpRequest: Request) {
    try {
      const params = httpRequest.body;
      const requiredFields = ["name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().lenght === 0) {
          return {
            statusCode: 400,
            body: {
              errorMessage: `Missing field value ${params}`,
            },
          };
        }
      }
      const createUserUseCase = new CreateUserUseCase(new PrismaUserRepository());
      const createdUser = await createUserUseCase.create(params);

      return {
        statusCode: 201,
        body: createdUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          errorMessage: "Iternal server error",
        },
      };
    }
  }
}
