const { client } = require("../../Config/dbConnent");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

//schedule collection
const Schedule = client.db("Kalender").collection("schedule");

// schedule confirmation email function
const sendBookingEmail = (booking) => {
  const { email, time, date } = booking;

  const auth = {
    auth: {
      api_key: process.env.Email_SEND_KEY,
      domain: process.env.Email_SEND_DOMAIN,
    },
  };

  // let transporter = nodemailer.createTransport({
  //   host: "smtp.sendgrid.net",
  //   port: 587,
  //   auth: {
  //     user: "apikey",
  //     pass: process.env.SENDGRID_API_KEY,
  //   },
  // });

  const nodemailerMailgun = nodemailer.createTransport(mg(auth));

  console.log("email", email);

  nodemailerMailgun.sendMail(
    {
      from: "sharifhosen73@gmail.com",
      to: email || "sharifhosen412@gmail.com", // An array if you have multiple recipients.

      subject: "Hey you, awesome!",

      //You can use "html:" to send HTML email content. It's magic!
      html: "<b>Wow Big powerful letters</b>",
      //You can use "text:" to send plain-text content. It's oldschool!
      text: "Mailgun rocks, pow pow!",
    },
    (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`Response: ${info}`);
      }
    }
  );

  // send email structure
  // nodemailerMailgun.sendMail(
  //   {
  //     from: "sharifhosen73@gmail.com", // verified sender email
  //     to: email, // recipient email
  //     subject: `Your schedule is at ${time} on ${date}`, // Subject line
  //     text: `
  //     <h1>Your schedule is confirm</h1>
  //     <div>
  //       <p>Please visit us Kalender at ${time} on ${date} </p>
  //       <p>Thanks for Kalender Team</p>
  //     </div>
  //     `, // plain text body
  //     html: "<b>Hello world!</b>", // html body
  //   },
  //   function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Email sent: " + info.response);
  //     }
  //   }
  // );
};

// single schedule post
const singleSchedulePost = (app) => {
  app.post("/single-schedule", async (req, res) => {
    try {
      const booking = req.body;

      const query = {
        date: booking.booking.date,
        time: booking.booking.time,
        email: booking.booking.email,
      };

      const result = await Schedule.insertOne(booking);
      // schedule confirmation email
      sendBookingEmail(booking.booking);

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
