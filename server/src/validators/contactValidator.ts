import Joi from 'joi';

export interface ContactFormInput {
    name: string;
    email: string;
    message: string;
}

// Validation schema using Joi
const contactSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must be less than 50 characters',
        }),
    
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
        }),
    
    message: Joi.string()
        .trim()
        .min(10)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Message is required',
            'string.min': 'Message must be at least 10 characters long',
            'string.max': 'Message must be less than 1000 characters',
        }),
});

// Validate contact form
export const validateContactForm = (data: any): { error?: Joi.ValidationError; value?: ContactFormInput } => {
    return contactSchema.validate(data, { abortEarly: false });
};

// Middleware for Express
export const validateContact = (req: any, res: any, next: any) => {
    const { error, value } = validateContactForm(req.body);
    
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ 
            success: false,
            message: errorMessage 
        });
    }
    
    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
};