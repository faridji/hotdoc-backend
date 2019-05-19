const config = require('config');

module.exports = function()
{
    if (!config.get('jwtPrivateKey'))
    {
        console.log('FATAL ERROR: jwtPrivateKey was not defined.');
        process.exit(1);
    }
}