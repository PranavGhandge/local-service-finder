import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../plugins/db";
import { createNotification } from "../utils/notification";

export const createBooking = async (req: any, reply: FastifyReply) => {
    try {
        const { service_id, date } = req.body;
        const user = req.user;

        if (user.role !== "user") {
            return reply.status(403).send({ msg: "Only users can book services" });
        }

        await db.query(
            "INSERT INTO bookings (user_id, service_id, date) VALUES (?,?,?)",
            [user.id, service_id, date]
        );

        const [service]: any = await db.query(
            "SELECT provider_id FROM services WHERE id=?",
            [service_id]
        );

        const providerId = service[0].provider_id;

        await createNotification(
            providerId,
            `New booking received from user ${user.id}`
        );

        return reply.send({ msg: "Booking created" });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ msg: "Server error" });
    }
};

export const getUserBookings = async (req: any, reply: FastifyReply) => {
    try {
        const user = req.user;

        const [rows] = await db.query(
            `SELECT bookings.*, services.title 
       FROM bookings 
       JOIN services ON bookings.service_id = services.id
       WHERE bookings.user_id = ?`,
            [user.id]
        );

        return rows;
    } catch (err) {
        return reply.status(500).send({ msg: "Server error" });
    }
};

export const getProviderBookings = async (req: any, reply: FastifyReply) => {
    try {
        const user = req.user;

        if (user.role !== "provider") {
            return reply.status(403).send({ msg: "Only providers allowed" });
        }

        const [rows] = await db.query(
            `SELECT bookings.*, users.name 
       FROM bookings 
       JOIN services ON bookings.service_id = services.id
       JOIN users ON bookings.user_id = users.id
       WHERE services.provider_id = ?`,
            [user.id]
        );

        return rows;
    } catch (err) {
        return reply.status(500).send({ msg: "Server error" });
    }
};

export const updateBookingStatus = async (req: any, rep: any) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const user = req.user

        if (user.role !== "provider") {
            return rep.status(403).send({ message: "Only Providers Allowed" });
        }

        const [rows]: any = await db.query(`SELECT bookings.*  FROM bookings
                 JOIN services ON bookings.service_id = services.id
                 WHERE bookings.id = ? AND services.provider_id = ?`,
            [bookingId, user.id]
        );

        if (rows.length === 0) {
            return rep.status(404).send({ message: "Booking not found" })
        }

        const booking = rows[0]

        await db.query("update bookings set status=? where id=?", [status, bookingId]);

        await createNotification(
            booking.user_id,
            `Your booking has been ${status}`
        );

        return rep.send({ message: "Booking status Updated" });
    }
    catch (err) {
        console.log(err)
        return rep.status(500).send({ message: "Server error" })
    }
}

export const cancleBooking = async (req: any, rep: any) => {
    try {
        const { bookingId } = req.params;
        const user = req.user;

        const [rows]: any = await db.query("select * from bookings where id=? and user_id=?", [bookingId, user.id]);

        if (rows.length === 0) {
            return rep.status(404).send({ message: "Booking not found" });
        }

        await db.execute("update bookings set status='cancelled' where id=?", [bookingId]);

        return rep.send({ message: "Booking Cancelled" });
    }
    catch (err) {
        return rep.status(500).send({ message: "Server Error" })
    }
}

export const getAllBookingDetails = async (req: any, reply: any) => {
    try {
        const [rows]: any = await db.query(`
      SELECT 
        bookings.id,
        bookings.date,
        bookings.status,

        users.name AS user_name,
        services.title AS service_title,
        providers.name AS provider_name

      FROM bookings
      JOIN users ON bookings.user_id = users.id
      JOIN services ON bookings.service_id = services.id
      JOIN users AS providers ON services.provider_id = providers.id
    `);

        const formatted = rows.map((b: any) => ({
            id: b.id,
            date: b.date,
            status: b.status,
            user: b.user_name,
            service: b.service_title,
            provider: b.provider_name,
        }));

        return formatted;

    } catch (err) {
        return reply.status(500).send({ msg: "Server error" });
    }
};