const { Schema, model } = require('mongoose');

const Joi = require('joi');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
}, { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().required(),
    subscription: Joi.string().default('starter'),
    token: Joi.string().default(null),
});

const loginSchema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
});

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema
}

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
}