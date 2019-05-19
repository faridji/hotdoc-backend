const Joi = require('joi');
const mongoose = require('mongoose');

const department = mongoose.model('department', new mongoose.Schema(
    {
        name: {
            type: String, required: true,
        },

        description: {
            type: String, required: true,
        },

        picture: {
            type: String,
            required: false,
        }
    }
));

function validateDept(dept)
{
    const schema = {
        name: Joi.string().required(),
        description: Joi.string().required(),
        picture: Joi.string()
    };

    return Joi.validate(dept, schema);
}

exports.Dept = department;
exports.validate = validateDept;