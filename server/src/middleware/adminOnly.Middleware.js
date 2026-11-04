export const adminOnly = (req, res, next) => {
    try {
        const role = req.user.role
        if (!req.user && role !== "admin") {
            return res.status(401).json({ message: " you cant do this action. unauterized!" })
        }
        return next()
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }

}