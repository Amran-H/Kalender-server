const { client } = require("../../Config/dbConnent");

//schedule collection
const Schedule = client.db("Kalender").collection("schedule");

// single schedule post
const singleSchedulePost = (app) => {
  app.post("/single-schedule", async (req, res) => {
    try {
      const schedule = req.body;
      const result = await Schedule.insertOne(schedule);
      res.send(result);
    } finally {
    }
  });
};

// single schedule get
const singleScheduleGet = (app) => {
  app.get("/single-schedule", async (req, res) => {
    try {
      const query = {};
      const result = await Schedule.find(query).toArray();
      res.send(result);
    } finally {
    }
  });
};

module.exports = { singleSchedulePost, singleScheduleGet };
