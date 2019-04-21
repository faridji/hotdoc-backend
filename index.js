const patients = require('./routes/patient');
const doctors = require('./routes/doctors');
const auth = require('./routes/auth');

const config = require('config');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Connection to mongodb
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/hotdoc', {useNewUrlParser: true})
    .then( () => console.log('Successfully connected to mongodb...'))
    .catch( (error) => console.log('Opps:', error.message));

app.use(cors());
app.use(express.json());

if (!config.get('jwtPrivateKey'))
{
    console.log('FATAL ERROR: jwtPrivateKey was not defined.');
    process.exit(1);
}

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('morgan enabled ...');
}

app.get('/', (req, res) => {
    res.send('Welcome to HotDoc, an online doctors appointment system');
});

app.use('/api/patients', patients);
app.use('/api/auth', auth);
app.use('/api/doctors', doctors)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});