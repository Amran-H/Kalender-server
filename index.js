require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./Config/dbConnent");
const { postUser, getUsers, updateUser } = require("./API/users/users");
const {
  singleSchedulePost,
  singleScheduleGet,
} = require("../Team-project-main/Kalender-server-main/API/scedule/schedule");
const {
  multiSchedulePost,
  multiScheduleGet,
} = require("../Team-project-main/Kalender-server-main/API/scedule/multiSchedule");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

//connecting the database
dbConnect();

//post user
postUser(app);

//get users
getUsers(app);

//update User
updateUser(app);

// single Schedule Post
singleSchedulePost(app);

// single Schedule Post
singleScheduleGet(app);

// multi Schedule Post
multiSchedulePost(app);

// multi Schedule Post
multiScheduleGet(app);

app.get("/", async (req, res) => {
  res.send("Kalender server is running");
});

app.listen(port, () => console.log(`Kalender server is running on ${port}`));
