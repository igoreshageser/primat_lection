// const express     = require('express'),
//       pgdb        = require('../libs/pgdb')(),
//       bodyParser  = require('body-parser'),
//       compression = require('compression'),
//       jwt         = require('jsonwebtoken');
//
// router = express.Router();
// secureRoutes = express.Router();
//
// router.use(compression({ level: 4 }));
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use('/map', secureRoutes);
// process.env.SECRET_KEY = 'GJrPplLlyTDoECvYWjFPfGWZsguuVURd';
//
// router.post('/', (req, res) => {
//     pgdb.query(`select * from point_test`)
//         .then( d => {
//             res
//                 .status(200)
//                 .send(d)
//         })
//         .catch((err) => res.status(500).end())
// });
//
// router.post('/login', (req, res) => {
//     const body = req.body;
//     console.log('/login');
//     console.log('req >>', req.body);
//     pgdb.query(`select * from autorization where email='${body.email}' and password='${body.password}'`)
//         .then(d => {
//             if (d.length === 0) {
//                 res.status(401).end();
//             } else {
//                 const user = {
//                     userEmail: body.email,
//                     password:  body.password
//                 };
//
//                 const token = jwt.sign(user, process.env.SECRET_KEY, {
//                     expiresIn: 4000
//                 });
//                 const userId = d[0].id;
//                 const userName = d[0].name
//                 res.json({
//                     status: 200,
//                     success: true,
//                     token: token,
//                     user_id: userId,
//                     user_name: userName
//                 }).end()
//             }
//         })
//         .catch((req, res) => {
//             res.status(401).send('dyadya eto catch').end();
//         });
// });
//
// router.post('/map', (req, res) => {
//
// });
//
// router.post('/map/add_point', (req, res) => {
//     console.log('/map/add_point req >>>', req.body);
//     const body = req.body;
//     const geojson = JSON.stringify(body.geoJsonPoint);
//
//     res.status(200).end();
//     pgdb.query(`INSERT INTO point_test (id_korustuvacha, geojson) VALUES ('${body.userId}', '${geojson}')`);
// })
//
// router.post('/reg', (req, res) => {
//     console.log('registration user');
//     const body = req.body;
//
//     pgdb.query(`select * from autorization where email='${body.email}'`)
//         .then(d => {
//             if (d.length === 0) {
//                 pgdb.query(`INSERT INTO autorization (name, email, password) VALUES ('${body.name}', '${body.email}', '${body.password}')`);
//                 res.status(201).end();
//             } else {
//                 console.log('deprecated');
//                 res.status(400).end();
//             }
//         });
// });
//
// secureRoutes.use((req, res, next) => {
//     console.log('middle ware', req.body);
//     const token = req.body.token || req.headers['token'];
//
//     if (token) {
//         jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
//             if (err) {
//                 res.status(500).send('Invalid token');
//             } else {
//                 console.log('token is valid');
//                 res.status(200).send('Token is valid');
//                 next();
//             }
//         })
//     } else {
//         console.log('token null >>>>>>');
//         res.status(401).send('dont have a token');
//     }
// });
//
// secureRoutes.post('/map', router);
//
// module.exports = router;