import type { GetOwnershipByIdRepository } from "../../repository/prisma/ownership/getOwnershipById.js";
import { fetchWeather } from "../../services/weather/weather.js";
import { AppError } from "../../error/error.js";
export class WeatherUseCase {
  private getOwnershipByIdRepository: GetOwnershipByIdRepository;
  constructor(getOwnershipByIdRepository: GetOwnershipByIdRepository) {
    this.getOwnershipByIdRepository = getOwnershipByIdRepository;
  }
  async weather(ownershipId: string) {
    const location =
      await this.getOwnershipByIdRepository.getOwnership(ownershipId);

    if (!location) {
      throw new AppError("Ownership not found", 404);
    }

    const latitude = location?.latitude?.toNumber();
    const longitude = location?.longitude?.toNumber();

    if (latitude === null || latitude === undefined) {
      throw new AppError("Ownership has no coordinates", 400);
    }

    if (longitude === null || longitude === undefined) {
      throw new AppError("Ownership has no coordinates", 400);
    }

    const weather = await fetchWeather(latitude, longitude);

    return weather;
  }
}
