import bcrypt from "bcrypt";
import {
  CreateUserRepository,
  type CreateUserDTO,
} from "../../repository/prisma/user/createUser.js";
import { AppError } from "../../error/error.js";
import { normalizePhoneNumber } from "../../helpers/phone.js";
import type { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import type { GetUserByPhoneNumberRepository } from "../../repository/prisma/user/getUserByPhoneNumber.js";

export class CreateUserUseCase {
  private createUserRepository: CreateUserRepository;
  private getUserByEmailRepository: GetUserByEmailRepository;
  private getUserByPhoneNumberRepository: GetUserByPhoneNumberRepository;
  constructor(
    createUserRepository: CreateUserRepository,
    getUserByEmail: GetUserByEmailRepository,
    getUserByPhoneNumber: GetUserByPhoneNumberRepository,
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserByEmailRepository = getUserByEmail;
    this.getUserByPhoneNumberRepository = getUserByPhoneNumber;
  }

  async create(data: CreateUserDTO) {
    const phoneNumberNormalized = normalizePhoneNumber(data.phoneNumber);
    const existingUserEmail = await this.getUserByEmailRepository.getEmail(
      data.email,
    );

    if (existingUserEmail) {
      throw new AppError("Email already in use", 409, "email", "EMAIL_ALREADY_IN_USE");
    }

    const existingUserPhone =
      await this.getUserByPhoneNumberRepository.getPhoneNumber(
        phoneNumberNormalized,
      );
    if (existingUserPhone) {
      throw new AppError("Phone number already in use", 409, "phoneNumber", "PHONE_ALREADY_IN_USE");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = {
      ...data,
      phoneNumber: phoneNumberNormalized,
      password: hashedPassword,
    };

    const createdUser = await this.createUserRepository.create(user);
    return createdUser;
  }
}
