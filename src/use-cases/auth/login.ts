import { AppError } from "../../error/error.js";
import type { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginUseCase {
  private getUserByEmailRepository: GetUserByEmailRepository;
  private jwtSecret: string;
  constructor(getByEmail: GetUserByEmailRepository, jwtSecret: string) {
    this.getUserByEmailRepository = getByEmail;
    this.jwtSecret = jwtSecret;
  }
  async login(email: string, password: string) {
    const user = await this.getUserByEmailRepository.getEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect", 401);
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new AppError("Email or password incorrect", 401);
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
    const jwtToken = jwt.sign(payload, this.jwtSecret, { expiresIn: "1h" });

    return {
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    };
  }
}
