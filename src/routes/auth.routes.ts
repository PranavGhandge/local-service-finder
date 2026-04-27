import { FastifyInstance } from "fastify";
import { sendOtp, verifyOtp, resetPassword, } from "../controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
    app.post("/send-otp", sendOtp);
    app.post("/verify-otp", verifyOtp);
    app.post("/reset-password", resetPassword);
}