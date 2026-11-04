import Joi from "joi"

export const createUserSchema = Joi.object({
    fname: Joi.string().trim().min(3).max(15).required().messages({
        'string.base': 'The first name should be a string',
        'string.empty': 'You should enter your first name',
        'string.min': 'First name must be at least 3 letters',
        'string.max': 'First name must be less than 15 letters',
        'any.required': 'First name is required'
    }),
    lname: Joi.string().trim().min(3).max(15).required().messages({
        'string.base': 'The last name should be a string',
        'string.empty': 'You should enter your last name',
        'string.min': 'last name must be at least 3 letters',
        'string.max': 'last name must be less than 15 letters',
        'any.required': 'last name is required'
    }),
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a text string.',
            'string.empty': 'Email cannot be empty.',
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is a required field.'
        }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,100}$'))
        .required()
        .messages({
            'string.base': 'Password must be a text string.',
            'string.empty': 'Password cannot be empty.',
            'string.pattern.base': 'Password must be 8-100 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'any.required': 'Password is a required field.'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password')).required()
        .messages({
            'any.only': 'Confirm password must match the password.',
            'any.required': 'Confirm password is a required field.',
            'string.empty': 'Confirm password cannot be empty.'
        }),
    role: Joi.string()
        .trim()
        .lowercase()
        .valid("user", "admin", "trader")
        .required()
        .messages({
            'string.base': 'Role must be a text string.',
            'string.empty': 'Role cannot be empty.',
            'any.only': 'Role must be either user, admin, or trader.',
            'any.required': 'Role is a required field.'
        }),
    avatar: Joi.string()
        .trim()
        .messages({
            'string.base': 'Avatar must be a text string.'
        })
})

export const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a text string.',
            'string.empty': 'Email cannot be empty.',
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is a required field.'
        }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,100}$'))
        .required()
        .messages({
            'string.base': 'Password must be a text string.',
            'string.empty': 'Password cannot be empty.',
            'string.pattern.base': 'Password must be 8-100 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'any.required': 'Password is a required field.'
        }),
})


