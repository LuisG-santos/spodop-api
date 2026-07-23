import db from "../../../db/client.js";
import { safeOwnershipSelect } from "../../../types/typeOwnership.js";

export class GetOwnershipRepository{
    async getOwnership(userId: string){
        return db.ownership.findMany({
            where: {userId},
            select: safeOwnershipSelect
        })
    }
}