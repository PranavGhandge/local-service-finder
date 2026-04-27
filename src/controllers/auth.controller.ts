import { FastifyReply } from "fastify";
import { db } from "../plugins/db";
import { sendOTP } from "../utils/mailer";

export const sendOtp = async (req: any, reply: any) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expires = new Date(Date.now() + 5 * 60000); // 5 min

    await db.query(
        "INSERT INTO otps (email, otp, expires_at) VALUES (?,?,?)",
        [email, otp, expires]
    );

    await sendOTP(email, otp);

    return reply.send({ msg: "OTP sent" });
};

export const verifyOtp = async (req: any, rep: FastifyReply) => {
    const { email, otp } = req.body;

    const [rows]: any = await db.query("select * from otps where email=? and otp=? expires_at > now()", [email, otp]);

    if (rows.length === 0) {
        return rep.send({ message: "Invalid or Expired OTP" })
    }

    return rep.send({ message: "OTP Verifired" })
}


export const resetPassword = async (req: any, rep: any) => {
    const { email, password } = req.body;

    await db.query("update users set password=? where email=?", [password, email]);

    return rep.send({ message: "Password updated" })
}
