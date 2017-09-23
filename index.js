const express = require('express');
const session = require('express-session');
const app = express();
const Server  = require("http").Server;
const server = Server(app);
const config = require('./config');
const cookieParser = require('cookie-parser');
const path = require('path');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || config.server.port;        // set our port

// router.get('/', (req, res) => {
//     res.json({ message: 'hooray! welcome to our api!' });
// });
//
// router.post('/login', (req, res) => {
//     console.log(res.body);
// });

app.use(cors());
const routes = require('./api/routes/app.js');
app.use('/api', routes);
//
// app.post('/api/login', (req, res) => {
//     // console.log('res => ', res);
//     console.log('res => ', res.status(200).json({ error: 'success -> :-)' }));
//     console.log('res => ', res.json(res.pipe(res)));
// });

//move to config
app.listen(port);
console.log('nodejs backend is startup on port '+port+'!');

//include api
// app.get('/api/reg', () => {
//     console.log('registration');
// });

// const routes = require('./app/routes');
