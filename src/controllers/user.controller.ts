import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../plugins/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, email, password, role } = request.body as any;

        if (!name || !email || !password || !role) {
            return reply.status(400).send({ message: "All fields require" })
        }

        const [existing]: any = await db.query("select * from users where email=?", [email]);

        if (existing.length > 0) {
            return reply.status(400).send({ message: "Email alredy exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await db.query("insert into users (name,email,password,role) values (?,?,?,?)", [name, email, hashPassword, role])

        return reply.send({ message: "User registered Successfully" })
    }
    catch (err) {
        return reply.status(500).send({ message: "Server Error" });
    }
}

export const loginUser = async (req: any, rep: any) => {
    try {
        const { email, password } = req.body;

        const [users]: any = await db.query("select * from users where email=?", [email]);

        if (users.length === 0) {
            return rep.status(400).send({ message: "Invalid Email or Password" })
        }

        const user = users[0]

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return rep.status(400).send({ message: "Invalid Email or Password" })
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        return rep.send({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (err) {
        console.log(err)
        return rep.status(500).send({ message: "Server error" })
    }
}



