import type { Response } from "express";

export const invalidEmailResponse = (res: Response) => {
  return res
    .status(400)
    .json({ message: "Invalid e-mail. Please provider a valid one" });
};

export const invalidPasswordResponse = (res: Response) => {
  return res.status(400).json({
    message:
      "Password must be at least 6 characters, 1 uppercase letter, 1 number and 1 special character.",
  });
};
