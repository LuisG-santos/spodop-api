import bcrypt from "bcrypt";
import {
  PrismaUserRepository,
  type CreateUserDTO,
} from "../../repository/prisma/createUser.js";
import { AppError } from "../../error/error.js";
import { normalizePhoneNumber } from "../../helpers/phone.js";

export class CreateUserUseCase {
  private repository: PrismaUserRepository;
  constructor(prismaUserRepository: PrismaUserRepository) {
    this.repository = prismaUserRepository;
  }
  async create(data: CreateUserDTO) {
    const phoneNumberNormalized = normalizePhoneNumber(data.phoneNumber);
    const existingUser = await this.repository.findEmailOrPhone(data.email, phoneNumberNormalized);
    if (existingUser) {
      throw new AppError("Email or phone number already in use", 409);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = {
      ...data,
      phoneNumber: phoneNumberNormalized,
      password: hashedPassword,
    };

    const createdUser = await this.repository.create(user);
    return createdUser;
  }
}
