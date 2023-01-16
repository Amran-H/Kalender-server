require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./Config/dbConnent');
const { postUser, getUsers } = require('./API/users/users');


const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

//connecting the database
dbConnect();

//post user
postUser(app)

//get users 
getUsers(app)

app.get("/", async (req, res) => {
    res.send("Kalender server is running");
})

app.listen(port, () => console.log(`Kalender server is running on ${port}`));