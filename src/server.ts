
import dotenv from "dotenv"

dotenv.config();

import Fastify from "fastify";
import { userRoutes } from "./routes/user.route";
import { serviceRoutes } from "./routes/service.routes";
import { bookingRoutes } from "./routes/booking.routes";
import { authRoutes } from "./routes/auth.routes";
import { notificationRoutes } from "./routes/notification.routes";

const app = Fastify({
  logger: true
});

app.register(userRoutes, { prefix: "/api/users" });
app.register(serviceRoutes, { prefix: "/api/services" });
app.register(bookingRoutes, { prefix: "/api/bookings" });
app.register(authRoutes, { prefix: "/api/auth" });
app.register(notificationRoutes, { prefix: "/api/notifications" });

app.get("/", async () => {
  return { msg: "Server running" };
});

app.listen({ port: 3000 }, () => {
  console.log("Server running on port 3000");
});