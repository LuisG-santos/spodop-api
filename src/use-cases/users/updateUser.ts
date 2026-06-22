import { GetUserByEmailRepository } from "../../repository/prisma/user/getUserByEmail.js";
import type {
  updateUserDTO,
  UpdateUserRepository,
} from "../../repository/prisma/user/updateUser.js";
import { AppError } from "../../error/error.js";
import bcrypt from "bcrypt";
import type { GetUserByPhoneNumber } from "../../repository/prisma/user/getUserByPhoneNumber.js";
import { normalizePhoneNumber } from "../../helpers/phone.js";
export class UpdateUserUseCase {
  private emailRepository: GetUserByEmailRepository;
  private updateRepository: UpdateUserRepository;
  private phoneNumberRepository: GetUserByPhoneNumber;
  constructor(
    getUserByEmail: GetUserByEmailRepository,
    updateUser: UpdateUserRepository,
    getUserByPhoneNumber: GetUserByPhoneNumber,
  ) {
    this.emailRepository = getUserByEmail;
    this.updateRepository = updateUser;
    this.phoneNumberRepository = getUserByPhoneNumber;
  }

  async updateUser(userId: string, params: updateUserDTO) {
     const normalizedPhone = params.phoneNumber 
    ? normalizePhoneNumber(params.phoneNumber) 
    : undefined;

  const [existingEmail, existingPhone] = await Promise.all([
    params.email ? this.emailRepository.getEmail(params.email) : null,
    normalizedPhone ? this.phoneNumberRepository.getPhoneNumber(normalizedPhone) : null,
  ]);
  if (existingEmail && existingEmail.id !== userId) {
    throw new AppError("This email already in use", 409);
  }

  if (existingPhone && existingPhone.id !== userId) {
    throw new AppError("This phone number already in use", 409);
  }

  const dataToUpdate = {
    ...params,
    ...(normalizedPhone && { phoneNumber: normalizedPhone }),
    ...(params.password && { password: await bcrypt.hash(params.password, 10) }),
  };
    // if (params.email) {
    //   const existingEmail = await this.emailRepository.getEmail(params.email);

    //   if (existingEmail && userId !== existingEmail?.id) {
    //     throw new AppError("This email already in use", 409);
    //   }
    // }

    // if (params.phoneNumber) {
    //   const phoneNumberNormalized = normalizePhoneNumber(params.phoneNumber);
    //   const existingPhoneNumber =
    //     await this.phoneNumberRepository.getPhoneNumber(phoneNumberNormalized);
    //   if (existingPhoneNumber && userId !== existingPhoneNumber?.id) {
    //     throw new AppError("This phone number already in use", 409);
    //   }
    // }

    //   const dataToUpdate = {
    //     ...params,
    //     ...(params.password && {password: await bcrypt.hash(params.password, 10)})
    //   }

    const uptadedUser = await this.updateRepository.updateUser(userId, dataToUpdate);
    return uptadedUser;
  }
}
