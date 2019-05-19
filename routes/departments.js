const express = require('express');
const router = express.Router();
const { Dept, validate } = require('../models/departments');

router.get('/', async (req, res) => {
    const depts = await Dept.find().sort('name');
    res.status(200).send(depts);
});

router.get('/:id', async (req, res) => {
    const dept = await Dept.findById(req.params.id);

    if (!dept) return res.status(404).send('Department with the given id was not found');

    res.status(200).send(dept);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let dept = new Dept({
        name: req.body.name,
        description: req.body.description,
        picture: req.body.picture
    });

    const result = await dept.save();

    res.status(200).send(result);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const dept = await Dept.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!dept) return res.status(404).send('Dept with the given Id was not found.');

    res.status(200).send(dept);
});

router.delete('/:id', async (req, res) => {
    const dept = await Dept.findByIdAndRemove(req.params.id);

    if (!dept) return res.status(404).send('Department with the given Id was not found');

    res.status(200).send(dept);
});

module.exports = router;