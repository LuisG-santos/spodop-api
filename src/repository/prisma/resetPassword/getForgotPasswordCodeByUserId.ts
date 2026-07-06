import db from "../../../db/client.js";

export class GetForgotPasswordCodeByUserIdRepository{
    async getCode(userId: string){
        return db.passwordResetToken.findUnique({
            where: {userId}
        })
    }
}