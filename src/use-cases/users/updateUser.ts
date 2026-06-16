import { GetUserByEmail } from "../../repository/prisma/getUserByEmail.js";
import type {
  updateUserDTO,
  UpdateUserRepository,
} from "../../repository/prisma/updateUser.js";
import { AppError } from "../../error/error.js";
import bcrypt from "bcrypt";

export class UpdateUserUseCase {
  private emailRepository: GetUserByEmail;
  private updateRepository: UpdateUserRepository;
  constructor(
    getUserByEmail: GetUserByEmail,
    updateUser: UpdateUserRepository,
  ) {
    this.emailRepository = getUserByEmail;
    this.updateRepository = updateUser;
  }

  async updateUser(userId: string, updateParams: updateUserDTO) {
    if (updateParams.email) {
      const existingEmail = await this.emailRepository.getEmail(
        updateParams.email,
      );

      if (existingEmail && userId !== existingEmail?.id) {
        throw new AppError("Email already exist", 409);
      }
    }

    if (updateParams.password) {
      const hashedPassword = await bcrypt.hash(updateParams.password, 10);
      updateParams.password = hashedPassword;
    }

    const uptadedUser = await this.updateRepository.updateUser(
      userId,
      updateParams,
    );
    return uptadedUser;
  }
}
