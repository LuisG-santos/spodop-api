import { Prisma } from "../../generated/prisma/client.js";

export const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  phoneNumber: true,
  createdAt: true,
  updateAt: true,
} satisfies Prisma.UserSelect;

export type SafeUser = Prisma.UserGetPayload<{ select: typeof safeUserSelect }>;