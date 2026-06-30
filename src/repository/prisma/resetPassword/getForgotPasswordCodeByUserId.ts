import db from "../../../db/client.js";

export class GetForgotPasswordCodeByUserId{
    async getResetPasswordCodeuser(userId: string){
        return db.passwordResetToken.findUnique({
            where: {userId}
        })
    }
}