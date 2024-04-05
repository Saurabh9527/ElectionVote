
const express = require("express");
const app = express();
const cors = require('cors')
const db = require("./db");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoutes.js")
const candidateRoute = require("./routes/candidateRoute.js");


require('dotenv').config();
app.use(bodyParser.json());

const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
app.use(cors(corsOption)); 
app.use("/user"  ,  userRoute)
app.use("/candidate"  ,  candidateRoute)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("server listing on 8080");
});