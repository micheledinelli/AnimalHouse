const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: false}
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'});
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        surname: joi.string().required().label("Surname"),
        email: joi.string().email().required().label("Email"),
        password: joi.passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
}

module.exports = { User, validate };