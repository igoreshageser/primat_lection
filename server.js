const express = require("express");

const app = express();

const PORT = 5501;

app.use(express.static("dist"));

app.listen(PORT, () => console.log(`Front-end server us up ${PORT}`));