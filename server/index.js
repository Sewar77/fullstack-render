import connectDB from "./src/config/db.js";
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.Routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import categoryRoutes from "./src/routes/category.routes.js";
import productsRoutes from "./src/routes/products.Routes.js";
import userRoutes from "./src/routes/user.Routes.js";
import cartRoutes from "./src/routes/cart.Routes.js";
import { sendEmail } from "./src/utils/sendMail.js";
connectDB();
const app = express();
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.VITE_URL || "https://fullstack-render-1.onrender.com,
        credentials: true,
    }),
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/health", (req, res) => {
    res.send("hello");
});
app.post("/test-email", async (req, res) => {
    try {
        await sendEmail(
            process.env.EMAIL_TEST,
            "EMAIL TEST",
            `<h2>welcome</h2>
       <h3>sewar</h3>
        `,
        );
        res.status(200).json({ message: "eamail sent" })
    } catch (error) {
        console.log("error", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productsRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);
app.listen(process.env.PORT, () => {
    console.log("server is working!", process.env.PORT);
});
