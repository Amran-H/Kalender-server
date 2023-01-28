const { client } = require("../../Config/dbConnent");

//schedule collection
const multiSchedule = client.db("Kalender").collection("MultiSchedule");

// multi schedule post
const multiSchedulePost = (app) => {
  app.post("/multi-schedule", async (req, res) => {
    const schedule = req.body;
    const result = await multiSchedule.insertOne(schedule);
    res.send(result);
  });
};

// single schedule get
const multiScheduleGet = (app) => {
  app.get("/multi-schedule", async (req, res) => {
    const query = {};
    const result = await multiSchedule.find(query).toArray();
    res.send(result);
  });
};
const CompleteScheduleGet = (app) => {
  app.get("/complete-schedule", async (req, res) => {
    try {
      const query = {};
      const result = await multiSchedule.find(query).toArray();
      res.send(result);
    } finally {
    }
  });
};

module.exports = { multiSchedulePost, CompleteScheduleGet, multiScheduleGet };
