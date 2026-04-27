import { FastifyInstance } from "fastify";
import { loginUser, registerUser } from "../controllers/user.controller";
import { authMiddleware } from "../plugins/auth";

export async function userRoutes(app: FastifyInstance) {
    app.post("/register", registerUser);
    app.post("/login", loginUser);
    app.get("/profile", { preHandler: authMiddleware }, async (req: any) => {
        return {
            msg: "Profile data",
            user: req.user,
        };
    });
}