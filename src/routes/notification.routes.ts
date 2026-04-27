import { FastifyInstance } from "fastify";
import { getNotifications } from "../controllers/notification.controller";
import { authMiddleware } from "../plugins/auth";

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/", { preHandler: authMiddleware }, getNotifications);
}