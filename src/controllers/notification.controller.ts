import { db } from "../plugins/db";

export const getNotifications = async (req: any, reply: any) => {
  const user = req.user;

  const [rows] = await db.query(
    "SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC",
    [user.id]
  );

  return rows;
};

export const getUnreadCount = async (req: any, reply: any) => {
  const user = req.user;

  const [rows]: any = await db.query(
    "SELECT COUNT(*) as count FROM notifications WHERE user_id=? AND is_read=false",
    [user.id]
  );

  return reply.send({ count: rows[0].count });
};

export const markAsRead = async (req: any, reply: any) => {
  const { id } = req.params;

  await db.query(
    "UPDATE notifications SET is_read=true WHERE id=?",
    [id]
  );

  return reply.send({ msg: "Marked as read" });
};