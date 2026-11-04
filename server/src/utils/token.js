import jwt from "jsonwebtoken"

export const generateAcessTokens = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role,
        type: "access",
    },
        process.env.ACCESS_JWT_SECRET,
        {
            expiresIn: "15m",
            issuer: "my-api",
            audience: "my-client"
        })
}

export const generateRefreshTokens = (user) => {
    return jwt.sign({
        id: user.id,
        type: "refresh",
    },
        process.env.REFRESH_JWT_SECRET,
        {
            expiresIn: "7d",
            issuer: "my-api",
            audience: "my-client"
        })
}

export const varifyAccessTokens = (token) => {
    return jwt.verify(
        token,
        process.env.ACCESS_JWT_SECRET,
        {
            issuer: "my-api",
            audience: "my-client"
        }
    )
}
export const varifyRefreshTokens = (token) => {
    return jwt.verify(
        token,
        process.env.REFRESH_JWT_SECRET,
        {
            issuer: "my-api",
            audience: "my-client"
        }
    )
}