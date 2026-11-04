export const validate = (schema) => {
    return (req, res, next) => {
        const { err, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUknown: true
        })
        if (err) {
            return res.status(400).json({
                message: "Validation Error",
                error: err.details.map((item) => ({
                    field: item.path.join(""),
                    message: item.message
                }))
            })
        }
        req.body = value
        next()
    }
}