import type { Response } from "express";

export const invalidEmailResponse = (res: Response) => {
  return res
    .status(400)
    .json({ message: "Invalid e-mail. Please provider a valid one" });
};
