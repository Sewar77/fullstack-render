import jwt from "jsonwebtoken"
export const protect = (req, res, next) => {
    try {
        // const autherization = req.headers.authorization;
        // if (!autherization || !autherization.startsWith("Bearer")) {
        //     return res.status(401).json({ message: "anautherized!" })
        // }
        // const token = autherization.split(" ")[1]
        const token = req.cookies?.accessTokens;

        if (!token) {
            console.log(`[Backend Blocked] Request to ${req.url} had no token.`);
            return res.status(401).json({ message: "Access token is missing" });
        }
        const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET, {
            issuer: "my-api", audience: "my-client"
        })
        if (payload.type !== "access") {
            return res.status(401).json({ message: "invalid tokens type!" })
        }
        req.user = {
            id: payload.id,
            role: payload.role
        }
        return next()
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({ message: "internal server error" })
    }
}