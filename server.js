const express = require("express");

const app = express();

const PORT = 5051;

app.use(express.static("dist"));

app.listen(PORT, () => console.log(`Express server us up ${PORT}`));
