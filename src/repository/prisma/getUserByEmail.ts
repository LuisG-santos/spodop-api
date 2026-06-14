import db from "../../db/client.js";
export class GetUserByEmail {
  async getEmail(email: string) {
    return await db.user.findUnique({
      where: { email },
    });
  }
}
