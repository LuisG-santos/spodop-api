import { WeatherController } from "../../controllers/weather/weather.js";
import { GetOwnershipByIdRepository } from "../../repository/prisma/ownership/getOwnershipById.js";
import { WeatherUseCase } from "../../use-cases/weather/weather.js";

export const makeWeatherController = () => {
  const getOwnershipByIdRepository = new GetOwnershipByIdRepository();
  const weatherUseCase = new WeatherUseCase(getOwnershipByIdRepository);
  const weatherController = new WeatherController(weatherUseCase);

  return weatherController;
};
