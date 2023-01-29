const { client } = require("../../Config/dbConnent");
var nodemailer = require("nodemailer");

//schedule collection
const multiSchedule = client.db("Kalender").collection("MultiSchedule");

// multi schedule post
const multiSchedulePost = (app) => {
  app.post("/multi-schedule", async (req, res) => {
    const schedule = req.body;
    const result = await multiSchedule.insertOne(schedule);

    const { email, hostEmail, teamCategory, meetingDescription, date, time } =
      schedule;

    // email sent
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email_SEND_EMAIL,
        pass: process.env.Email_SEND_PASS,
      },
    });

    // const email = schedule.email;
    email.forEach((element) => {
      var mailOptions = {
        from: hostEmail,
        to: element,
        subject: `Your Meeting Schedule is ${teamCategory}`,
        html: `
        <div>
        <h3>Your Meeting Schedule is ${teamCategory} on the ${date} at ${time}</h3>
        <P><bold>Invitee Email:</bold> ${hostEmail}</P>
        <p>${meetingDescription}</p>
        <span>Thanks from Kalerdar</span>
        </div>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: success");
        }
      });
    });

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
