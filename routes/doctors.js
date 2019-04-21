const { Doctor, validate } = require('../models/doctors');

const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Doctor.find().sort("name");
    res.status(200).send(genres);
});

router.get('/:id', async (req, res) => {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).send('Doctor with the given ID was not found.');

    res.status(200).send(doctor)
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor) return res.status(400).send('Email already exists.');

    doctor = await Doctor.findOne({ mob_number: req.body.mob_number });
    if (doctor) return res.status(400).send('Mob Number already exists.');

    doctor = new Doctor(_.pick(req.body, 
                ['name', 'email', 'password','mob_number','education','department','experience',
                 'age','address','picture']));
   
    const result = await doctor.save();

    res.status(200).send(_.pick(result, ['_id','name', 'email','mob_number','education','department','experience',
                                         'age','address','picture']));         
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!doctor) return res.status(404).send('Doctor wit the given ID was not found.');

    res.status(200).send(doctor);
});

router.delete('/:id', async (req, res) => {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);

    if (!doctor) return res.status(404).send('Doctor with the given ID was not found.');

    res.status(200).send(doctor);
});

module.exports = router;