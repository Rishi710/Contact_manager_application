const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDb = require('./db/conn');

const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');
const PORT = process.env.PORT;
connectDb();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

