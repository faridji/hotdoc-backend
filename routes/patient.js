const { Patient, validate } = require('../models/patient');
const express = require('express');
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

    const patient = new Patient({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        age: req.body.age,
        picture: req.body.picture
    });

    // saving data is put into try and catch, to catch the possible errors.
    try {
        const result = await patient.save();
        res.status(200).send(result);
    }
    catch(error) {
        // Handling unique contraints error messages;
        if (error.name === 'MongoError' && error.code === 11000) {
            const field = error.errmsg.split("index:")[1].split("dup key")[0].split("_")[0];
            return res.status(400).send(`${field} already exists`);
        }

        res.status(400).send(error.message);
    }
         
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