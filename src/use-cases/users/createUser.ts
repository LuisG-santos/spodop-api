import bcrypt from "bcrypt";
import {
  PrismaUserRepository,
  type CreateUserDTO,
} from "../../repository/prisma/createUser.js";
import { AppError } from "../../error/error.js";
import { normalizePhoneNumber } from "../../helpers/phone.js";
import type { GetUserByEmail } from "../../repository/prisma/getUserByEmail.js";
import type { GetUserByPhoneNumber } from "../../repository/prisma/getUserByPhoneNumber.js";

export class CreateUserUseCase {
  private repository: PrismaUserRepository;
  private repository2: GetUserByEmail;
  private repository3: GetUserByPhoneNumber;
  constructor(
    prismaUserRepository: PrismaUserRepository,
    getUserByEmail: GetUserByEmail,
    getUserByPhoneNumber: GetUserByPhoneNumber
  ) {
    this.repository = prismaUserRepository;
    this.repository2 = getUserByEmail;
    this.repository3 = getUserByPhoneNumber
  }

  async create(data: CreateUserDTO) {

    const phoneNumberNormalized = normalizePhoneNumber(data.phoneNumber);
    const existingUserEmail = await this.repository2.getEmail(data.email);

    if (existingUserEmail) {
      throw new AppError("Email already in use", 409);
    }

    const existingUserPhone = await this.repository3.getPhoneNumber(phoneNumberNormalized)
    if(existingUserPhone){
      throw new AppError("Phone number already in use", 409)
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
