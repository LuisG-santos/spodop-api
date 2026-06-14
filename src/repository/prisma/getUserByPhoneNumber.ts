import db from "../../db/client.js";

export class GetUserByPhoneNumber{
    async getPhoneNumber(phoneNumber: string){
        return await db.user.findUnique({
            where: {phoneNumber}
        })
    }
}