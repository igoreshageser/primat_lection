const express = require("express");

const app = express();

const PORT = 5501;

app.use(express.static("dist"));

app.listen(PORT, () => console.log(`Express server us up ${PORT}`));