const morgan = require('morgan');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('morgan enabled ...');
}

app.get('/', (req, res) => {
    res.send('Welcome to HotDoc, an online doctors appointment system');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});