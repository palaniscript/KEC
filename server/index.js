require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require("cors");
app.use(cors());

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
app.use(express.json())

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

/**** Users */
const getUsers = require('./routes/getUsers');
const createUser = require('./routes/createUser');
const updateUser = require('./routes/updateUser');
const deleteUser = require('./routes/deleteUser');
const getUserById = require('./routes/getUserById');
const loginUser = require('./routes/loginUser');

app.use('/users', getUsers);
app.use('/users', createUser);
app.use('/users', updateUser);
app.use('/users', deleteUser);
app.use('/users', getUserById);

app.use('/login', loginUser);

app.listen(3100, () => console.log('server started in port 3100'));