import db from "../../../db/client.js";
import{ safeOwnershipSelect, type SafeOwnership } from "../../../types/typeOwnership.js";
export type CreateOwnershipDTO = {
  userId: string;
  name: string;
  totalArea: number;
  longitude?: number;
  latitude?: number;
};

export class CreateOwnershipRepository {
  async create(data: CreateOwnershipDTO) {
    return db.ownership.create({
      data,
      select: safeOwnershipSelect
    });
  }
}
