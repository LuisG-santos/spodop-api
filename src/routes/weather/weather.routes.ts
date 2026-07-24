import { Router } from "express";
import { makeWeatherController } from "../../factories/weather/weather.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router: Router = Router();

const weatherController = makeWeatherController();

router.get<{ ownershipId: string }>(
  "/:ownershipId",
  authMiddleware,
  (req, res) => {
    weatherController.weather(req, res);
  },
);

export default router;
