const mongoose = require('mongoose');
const config = require('config');

module.exports = function()
{
    // Connection to mongodb
    const db = config.get('db');
    
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db, {useNewUrlParser: true})
        .then( () => console.log('Successfully connected to mongodb...'))
        .catch( (error) => console.log('Opps:', error.message));
}