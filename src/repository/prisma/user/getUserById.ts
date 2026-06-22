import db from "../../../db/client.js";
import {safeUserSelect}  from "../../../types/typeUser.js";
export class GetUserByIdRepository {
  async getUserById(id: string){
    return db.user.findUnique({
      where: { id },
      select: safeUserSelect
    });
  }
}
