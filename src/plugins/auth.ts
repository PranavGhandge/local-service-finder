import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"

export async function authMiddleware(req: FastifyRequest, rep: FastifyReply) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return rep.status(401).send({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        (req as any).user = decoded;
    }
    catch (err) {
        return rep.status(401).send({ message: "Invalid Token" })
    }
}