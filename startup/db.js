const mongoose = require('mongoose');


module.exports = function()
{
    // Connection to mongodb
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost/hotdoc', {useNewUrlParser: true})
        .then( () => console.log('Successfully connected to mongodb...'))
        .catch( (error) => console.log('Opps:', error.message));
}