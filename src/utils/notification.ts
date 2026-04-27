import { db } from "../plugins/db"

export const createNotification = async (user_id: number, message: string)=>{
    await db.execute(
        "insert into notifications (user_id,message) values (?,?)",[user_id,message]
    )
}