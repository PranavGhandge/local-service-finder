import { FastifyInstance } from "fastify";
import { addService, getServices } from "../controllers/service.controller";
import { authMiddleware } from "../plugins/auth";

export async function serviceRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: authMiddleware }, addService);
  app.get("/", getServices);
}