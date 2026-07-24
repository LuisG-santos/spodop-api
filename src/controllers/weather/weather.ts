import type { Request, Response } from "express";
import type { WeatherUseCase } from "../../use-cases/weather/weather.js";
import { AppError } from "../../error/error.js";
import { internalErrorResponse } from "../../helpers/http.js";

export class WeatherController {
  private weatherUseCase: WeatherUseCase;
  constructor(weatherUseCase: WeatherUseCase) {
    this.weatherUseCase = weatherUseCase;
  }
  async weather(req: Request<{ ownershipId: string }>, res: Response) {
    try {
      const ownershipId = req.params.ownershipId;

      if (!ownershipId) {
        return res.status(400).json({ message: "Missing ownership param" });
      }

      const weather = await this.weatherUseCase.weather(ownershipId);

      return res.status(200).json(weather);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return internalErrorResponse(res);
    }
  }
}
