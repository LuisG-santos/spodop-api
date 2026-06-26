import { Prisma } from "../../generated/prisma/client.js";

export const safeOwnershipSelect = {
  name: true,
  longitude: true,
  latitude: true,
  createdAt: true,
  updateAt: true,
} satisfies Prisma.OwnershipSelect;

export type SafeOwnership = Prisma.OwnershipGetPayload<{ select: typeof safeOwnershipSelect }>;