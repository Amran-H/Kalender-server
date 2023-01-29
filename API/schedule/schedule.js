const { client } = require("../../Config/dbConnent");
var nodemailer = require("nodemailer");

//schedule collection
const Schedule = client.db("Kalender").collection("schedule");

// schedule confirmation email function

// single schedule post
const singleSchedulePost = (app) => {
  app.post("/single-schedule", async (req, res) => {
    const booking = req.body;

    const result = await Schedule.insertOne(booking);

    // email send
    const {
      email,
      hostEmail,
      meetingCategory,
      meetingDescription,
      date,
      time,
    } = booking;
    console.log("hostEmail", hostEmail);
    console.log("hostEmail", meetingCategory);
    console.log("hostEmail", meetingDescription);
    console.log("hostEmail", date);
    console.log("hostEmail", time);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email_SEND_EMAIL,
        pass: process.env.Email_SEND_PASS,
      },
    });

    var mailOptions = {
      from: hostEmail,
      to: email,
      subject: `Your Meeting Schedule is ${meetingCategory}`,
      html: `
      <div>
      <h5>Your Meeting Schedule is ${meetingCategory} on the ${date} at ${time}</h5>
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
