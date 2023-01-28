const { ObjectId } = require("mongodb");
const { client } = require("../../Config/dbConnent");

const schedule = client.db("Kalender").collection("schedule");
const multiSchedule = client.db("Kalender").collection("MultiSchedule");
const deleteShedeule = (app) => {
  app.delete("/single-schedule/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await schedule.deleteOne(query);
    res.send(result);
  });
};
const deleteMultiSchedule = (app) => {
  app.delete("/multi-schedule/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await multiSchedule.deleteOne(query);
    res.send(result);
  });
};
module.exports = { deleteShedeule, deleteMultiSchedule };
