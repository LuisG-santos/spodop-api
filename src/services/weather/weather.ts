import { fetchWeatherApi } from "openmeteo";
import { AppError } from "../../error/error.js";

export const fetchWeather = async (lat: number, lon: number) => {
  try {
    const params = {
      latitude: lat,
      longitude: lon,
      hourly: [
        "temperature_2m",
        "precipitation_probability",
        "rain",
        "wind_speed_10m",
        "wind_gusts_10m",
        "relative_humidity_2m",
      ],
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const utcOffsetSeconds = response?.utcOffsetSeconds();

    if (utcOffsetSeconds === undefined || utcOffsetSeconds === null) {
      throw new AppError("Could not get weather data", 502);
    }

    const hourly = response?.hourly()!;

    const weatherData = {
      hourly: {
        time: Array.from(
          {
            length:
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval(),
          },
          (_, i) =>
            new Date(
              (Number(hourly.time()) +
                i * hourly.interval() +
                utcOffsetSeconds) *
                1000,
            ),
        ),
        temperature_2m: hourly.variables(0)!.valuesArray(),
        precipitation_probability: hourly.variables(1)!.valuesArray(),
        rain: hourly.variables(2)!.valuesArray(),
        wind_speed_10m: hourly.variables(3)!.valuesArray(),
        wind_gusts_10m: hourly.variables(4)!.valuesArray(),
        relative_humidity_2m: hourly.variables(5)!.valuesArray(),
      },
    };

    return weatherData.hourly;
  } catch (error) {
    console.log(error);
    throw new AppError("Internal server error", 500);
  }
};
