const { Patient, validate } = require('../models/patient');

const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Patient.find().sort("name");
    res.status(200).send(genres);
});

router.get('/:id', async (req, res) => {

    const patient = await Patient.findById(req.params.id);

    if (!patient) return res.status(404).send('Patient with the given ID was not found.');

    res.status(200).send(patient)
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let patient = await Patient.findOne({ email: req.body.email });
    if (patient) return res.status(400).send('Email already exists.');

    patient = await Patient.findOne({ mob_number: req.body.mob_number });
    if (patient) return res.status(400).send('Mob Number already exists.');

    patient = new Patient(_.pick(req.body, 
                ['name', 'email', 'password','mob_number','age','picture']));
   
    const result = await patient.save();

    const token = jwt.sign({ _id: patient._id, name: req.body.name }, config.get('jwtPrivateKey'));

    
    res.setHeader('x-auth-token', token);
    res.status(200).send(_.pick(result, ['_id','name', 'email','mob_number','age','picture']));         
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!patient) return res.status(404).send('Patient wit the given ID was not found.');

    res.status(200).send(patient);
});

router.delete('/:id', async (req, res) => {
    const patient = await Patient.findByIdAndRemove(req.params.id);

    if (!patient) return res.status(404).send('Patient with the given ID was not found.');

    res.status(200).send(patient);
});

module.exports = router;