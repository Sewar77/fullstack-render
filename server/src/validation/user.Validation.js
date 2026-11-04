import Joi from "joi";

export const updateUserSchema = Joi.object({
    fname: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .messages({
            "string.base": "First name should be a string",
            "string.empty": "First name cannot be empty",
            "string.min": "First name must be at least 3 characters",
            "string.max": "First name must be less than 100 characters",
        }),

    lname: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .messages({
            "string.base": "Last name should be a string",
            "string.empty": "Last name cannot be empty",
            "string.min": "Last name must be at least 3 characters",
            "string.max": "Last name must be less than 100 characters",
        }),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .messages({
            "string.base": "Email must be a text string",
            "string.empty": "Email cannot be empty",
            "string.email": "Please provide a valid email address",
        }),

    avatar: Joi.string()
        .trim()
        .uri()
        .messages({
            "string.base": "Avatar must be a string",
            "string.empty": "Avatar cannot be empty",
            "string.uri": "Avatar must be a valid URL",
        }),
})
    .min(1)
    .messages({
        "object.min": "You must provide at least one field to update",
    });