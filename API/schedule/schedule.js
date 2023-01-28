const { client } = require("../../Config/dbConnent");

//schedule collection
const Schedule = client.db("Kalender").collection("schedule");

// single schedule post
const singleSchedulePost = (app) => {
  app.post("/single-schedule", async (req, res) => {
    const booking = req.body;
    const result = await Schedule.insertOne(booking);
    res.send(result);
  });
};

// single schedule get
const singleScheduleGet = (app) => {
  app.get("/single-schedule", async (req, res) => {
    const query = {};
    const result = await Schedule.find(query).toArray();
    res.send(result);
  });
};

module.exports = { singleSchedulePost, singleScheduleGet };
