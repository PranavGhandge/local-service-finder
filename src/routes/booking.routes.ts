import { FastifyInstance } from "fastify";
import { createBooking, getUserBookings, getProviderBookings, updateBookingStatus, cancleBooking, getAllBookingDetails } from "../controllers/booking.controller";
import { authMiddleware } from "../plugins/auth";

export async function bookingRoutes(app: FastifyInstance) {
    app.post("/", { preHandler: authMiddleware }, createBooking);
    app.get("/my", { preHandler: authMiddleware }, getUserBookings);
    app.get("/provider", { preHandler: authMiddleware }, getProviderBookings);
    app.put("/:bookingId/status", { preHandler: authMiddleware }, updateBookingStatus);
    app.put("/:bookingId/cancel", { preHandler: authMiddleware }, cancleBooking);
    app.get("/all/details", { preHandler: authMiddleware }, getAllBookingDetails);
}