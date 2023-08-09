import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";


import cors from "cors";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

var admin = require("firebase-admin");

var serviceAccount = require("./wipg5-d88b1-firebase-adminsdk-2m8g6-876f8c77b8.json");

// const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'wipg5-d88b1',
});

app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;
  
  const message = {
    notification: {
      title: "Notif",
      body: 'This is a Test Notification'
    },
    token: "fgryEcABRhipBQ3sWPlsIQ:APA91bHeUUrxeH4ioxSx1i0EgYK0un2clljYtOjf7q9KzYcZNkwlEcBnGtS5rlAZuPIe6v9QhnbszxkbrBWCImwCBQl7NFfGcScAI2lD3NzaDPCiXxT6l16oiy0BHx6HuJDtALZDIJ_v",
  };
  
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
  
  
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});