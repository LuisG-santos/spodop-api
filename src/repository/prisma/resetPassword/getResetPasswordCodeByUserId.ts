import db from "../../../db/client.js";

export class GetResetPasswordCodeByUserId{
    async getResetPasswordCodeuser(userId: string){
        return db.passwordResetToken.findUnique({
            where: {userId}
        })
    }
}