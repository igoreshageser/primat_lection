const express = require("express");
const history = require('connect-history-api-fallback');

const app = express()

const staticFileMiddleware = express.static('dist');
app.use(staticFileMiddleware)
app.use(history({
    disableDotRule: true,
    verbose: true
}))
app.use(staticFileMiddleware)

const PORT = 5501;


app.listen(PORT, () => console.log(`Front-end server us up ${PORT}`));