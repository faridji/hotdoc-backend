const { Dept } = require('../models/departments');
const { Patient } = require('../models/patient');
const { Doctor } = require('../models/doctors');

const express = require('express');
const router = express.Router();

router.get('/GetAllCounts', async (req, res) => {
    let no_of_patients = 0;
    let no_of_doctors = 0;
    let no_of_depts = 0;

    await Patient.find().then( patients => {
        no_of_patients = patients.length;
    });
    await Doctor.find().then( doctors => {
        no_of_doctors = doctors.length;
    });
    await Dept.find().then( depts => {
        no_of_depts = depts.length;
    });

    res.send({
        patients: no_of_patients,
        doctors: no_of_doctors,
        depts: no_of_depts
    });
});

module.exports = router;