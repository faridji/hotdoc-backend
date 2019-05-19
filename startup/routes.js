const patients = require('../routes/patient');
const doctors = require('../routes/doctors');
const depts = require('../routes/departments');
const auth = require('../routes/auth');
const dashboard = require('../routes/dashboard');

const cors = require('cors');
const express = require('express');

module.exports = function(app) {
    app.use(cors());
    app.use(express.json());

    app.use('/api/patients', patients);
    app.use('/api/auth', auth);
    app.use('/api/doctors', doctors);
    app.use('/api/departments', depts);
    app.use('/api/dashboard', dashboard);
}