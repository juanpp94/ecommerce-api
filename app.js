require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;
app.use(cors());
app.use(express.json());

//Routes:
//http://localhost/api/....
app.use("/api",require("./routes"));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})