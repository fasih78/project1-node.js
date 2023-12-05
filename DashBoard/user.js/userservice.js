const express = require("express");
const UserModel = require("./usermodel.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

// const SignUp = async (req, res) => {
//   try {
//     const { email, name, password, phonenumber } = req.body;

//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hash = bcrypt.hashSync(password, salt);

//     const LastUser = await UserModel.findOne().sort({ _id: -1 }).exec();
//     const id = LastUser ? LastUser.id + 1 : 1;

//     // function generateOTP() {
//     //   return Math.floor(100000 + Math.random() * 900000);
//     // }
//     const userexists = await UserModel.findOne({ email: email });
//     console.log("email exist ", userexists);
//     const validation = validator.isEmail(email);

//     if (userexists) {
//       res.status(200).send({ messsage: "User Already Exists!" });
//     } else {
//       if (validation) {
//         // const otpGenerated = generateOTP(); // Implement your OTP generation function

//         // Send OTP via SMS using Twilio
//         const accountSid = process.env.TWILIO_ACCOUNT_SID;
//         const authToken = process.env.TWILIO_AUTH_TOKEN;

//         const client = require("twilio")(accountSid, authToken);

//         client.verify.v2
//           .services(process.env.TWILIO_SERVICE_SID)
//           .verifications.create({ to: "+923142574491", channel: "sms" })

//         .then((message) => {
//           console.log("Twilio API Response:", message);
//           // res.status(200).send({
//           //   message: "OTP sent successfully!",
//           //   messageId: message.sid,
//           // });
//         })
//         .catch((err) => {
//           console.log("Error sending OTP:", err);
//           res.status(500).json({ error: "Failed to send OTP." });
//         });
//         const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
//           expiresIn: "365d",
//         });
//         console.log(token);

//         const signinn = await UserModel.create({
//           id,
//           email,
//           name,
//           phonenumber,
//           password: hash,
//         });
//         await signinn.save();

//         res.status(201).send({
//           success: true,
//           messsage: "SignUp Sucessfully!   &&   OTP sent successfully!",
//           data: signinn,
//           token: token,
//         });
//       } else {
//         res
//           .status(404)
//           .send({ success: false, messsage: "Invalid Email!", data: { res } });
//       }
//     }
//   } catch (err) {
//      res.status(500).send(err);
//   }
// };
const SignUp = async (req, res) => {
  try {
    const { email, name, password, phonenumber } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const userExists = await UserModel.findOne({ email: email });
    const validation = validator.isEmail(email);

    if (userExists) {
      return res.status(400).json({ message: "User Already Exists!" });
    } else if (!validation) {
      return res.status(400).json({ message: "Invalid Email!" });
    }

    const LastUser = await UserModel.findOne().sort({ _id: -1 }).exec();
    const id = LastUser ? LastUser.id + 1 : 1;

    function generateOTP() {
      const otpBuffer = crypto.randomBytes(3); // Adjust the number of bytes as needed
      const otp = otpBuffer.readUIntBE(0, otpBuffer.length) % 1000000;

      return otp.toString().padStart(6, "0");
    }

    const otpGenerated = generateOTP();

    // Generate OTP and send via Twilio
    // const otpGenerated = Math.floor(100000 + Math.random() * 900000);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    try {
      // const message = await client.verify.v2
      //   .services(process.env.TWILIO_SERVICE_SID)
      //   .verifications.create({
      //       to: phonenumber,
      //       channel: "sms",
      //       body: `hELLOW`
      //     });

      const message = await client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phonenumber,
        body: "hellow",
      });

      const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "365d",
      });

      const newUser = await UserModel.create({
        id,
        email,
        name,
        phonenumber,
        password: hash,
      });
      await newUser.save();
      return res.status(201).json({
        success: true,
        message: "SignUp Successfully! OTP sent successfully!",
        data: newUser,
        token: token,
        TwilioAPIResponse: message,
      });
    } catch (twilioError) {
      return res.status(401).send({ message: twilioError });
    }
  } catch (err) {
    console.error("Error in SignUp:", err);
    res.status(500).json({ error: "An error occurred." });
  }
};

const OtpVerify = async (req, res) => {
  try {
    const { otp } = req.body;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    const message1 = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: "+923142574491", code: otp });

    res.status(201).json({
      success: true,
      message: "phone number Verify Sucessfully!",
      TwilioVerify: message1,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Invalid Otp!" });
  }
};

const login = async (req, res) => {
  let response;
  try {
    const { email, password } = req.body;
    const findemail = await UserModel.findOne({ email: email }).exec();

    if (findemail) {
      const hash = findemail.password;
      const passwordcompared = await bcrypt.compare(password, hash);
      if (passwordcompared) {
        const findpassword = await UserModel.findOne({
          password: passwordcompared,
        }).exec();

        var transporter = nodemailer.createTransport({
          service: "outlook",
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
          },
        });
        const info1 = await transporter.sendMail({
          from: "career@fascom.com", // sender address
          to: "career@fascom.com", // list of receivers
          subject: `Hello !  ${email}`, // Subject line
          text: `Welcome to Fascom Limited
          Thank you for interest in empolyment at Fascom Limited. if your qualifiaction
          match our needs , we will contact you to learn more about your fit in this position
          
          Thanks again for your inquiry!
          
          - Fascom Limited
          ,
          `,
        });
        res.status(200).send({ message: "login!" });
      } else {
        res.status(400).send({ message: "Wrong Password!" });
      }
    } else {
      res.status(404).send({ message: "Invalid Email Address!" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { SignUp, login, OtpVerify };
