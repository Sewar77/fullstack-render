import nodemailer from "nodemailer"
import dotenv from "dotenv"
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

export const sendEmail = async (to, subject, html) => {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to, subject, html
    })
    return info
}

