import type { Request, Response } from "express";
import type { LoginUseCase } from "../../use-cases/auth/login.js";
import { AppError } from "../../error/error.js";
import { checkIfEmailIsValid } from "../../helpers/user.js";
import { invalidEmailResponse } from "../../helpers/http.js";
export class LoginController {
  private loginUseCase: LoginUseCase;
  constructor(loginUser: LoginUseCase) {
    this.loginUseCase = loginUser;
  }
  async login(req: Request, res: Response) {
    try {
      const params = req.body;
      const requiredFields = ["email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return res
            .status(400)
            .json({ message: `Missing field value ${field}` });
        }
      }

      if (params.email) {
        if (!checkIfEmailIsValid(params.email)) {
          return invalidEmailResponse(res);
        }
      }

      const result = await this.loginUseCase.login(
        params.email,
        params.password,
      );

      const { token, user } = result;

      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
}
