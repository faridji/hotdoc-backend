const Joi = require("joi");
const mongoose = require("mongoose");

const patient = mongoose.model("patient", new mongoose.Schema({
    name: {
      type: String, required: true
    },
    email: {
      type: String, require: true, unique: true,
    },
    password: {
      type: String, require: true, minlength: 12, maxlength: 100
    },
    mob_number: {
      type: String, required: true, minlength: 11, maxlength: 11, unique: true
    },
    age: {
      type: Number, required: false, min: 0, max: 200
    },
    address: {
      type: String,
      required: false,
      min: 5,
      max: 1024,
    },
    picture: {
      type: String, required: false
    },
    date_added: {
      type: Date,
      default: Date.now
    }
  })
);

function validatePatient(patient) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(12).max(30),
        mob_number: Joi.string().required().min(11).max(11),
        age: Joi.number().allow(null).min(0).max(200),
        address: Joi.string().allow('',null).min(5).max(1024),
        picture: Joi.string()
    }

    return Joi.validate(patient, schema);
}

exports.Patient = patient;
exports.validate = validatePatient;