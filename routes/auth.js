const { Patient } = require('../models/patient');

const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const express = require('express');
const _ = require('lodash');

const router = express.Router();

router.post('/patient', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let patient = await Patient.findOne({ email: req.body.email });
    if (!patient) return res.status(400).send('Invalid email or password.');

    if (patient.password != req.body.password) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: patient._id, name: patient.name }, config.get('jwtPrivateKey'));
    res.status(200).send({ "token": token });
});

router.post('/admin', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.email !== 'admin@hotdoc.com') return res.status(400).send('Invalid email or password.');
    if (req.body.password !== 'hotdoc123456') return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ name: 'admin', isAdmin: true }, config.get('jwtPrivateKey'));
    res.status(200).send({ "token": token });
});

function validate(req) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(12).max(30),
    }

    return Joi.validate(req, schema);
}

module.exports = router;