import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required().messages({
        "string.base": "The name should be a string",
        "string.empty": "You should enter name",
        "string.min": " name must be at least 3 letters",
        "string.max": " name must be less than 15 letters",
        "any.required": " name is required",
    }),
    descripiton: Joi.string().trim().max(200).messages({
        "string.base": "The first name should be a string",
        "string.empty": "You should enter your first name",
        "string.max": "First name must be less than 15 letters",
    }),
});
