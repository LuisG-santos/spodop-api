import db from "../../../db/client.js";

export class GetForgotPasswordCodeByUserId{
    async getCode(userId: string){
        return db.passwordResetToken.findUnique({
            where: {userId}
        })
    }
}