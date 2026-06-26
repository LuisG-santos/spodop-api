import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthUser } from "../types/express.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secretKey = process.env.JWT_SECRET_KEY!;
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  const token = authHeaders.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decode = jwt.verify(token, secretKey) as AuthUser;

    if (typeof decode === "string" || !decode.sub) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
