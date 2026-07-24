import db from "../../../db/client.js";
import { safeOwnershipSelect } from "../../../types/typeOwnership.js";

export class GetOwnershipByIdRepository {
  async getOwnership(id: string) {
    return db.ownership.findUnique({
      where: { id },
      select: safeOwnershipSelect,
    });
  }
}
