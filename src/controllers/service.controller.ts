import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../plugins/db";

export const addService = async (req: any, reply: FastifyReply) => {
    try {
        const { title, description } = req.body;
        const user = req.user

        if (user.role !== "provider") {
            return reply.status(403).send({ message: "Only providers can add services" })
        }

        await db.query("insert into services (title, description, provider_id) values (?,?,?)", [title, description, user.id]);

        return reply.send({ message: "Service Added" });
    }
    catch (err) {
        console.log(err)
        return reply.status(500).send({ message: "server error" })
    }
}

export const getServices = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const [rows] = await db.query("select * from services");
        return rows;
    }
    catch (err) {
        return rep.status(500).send({ message: "Server error" })
    }
}