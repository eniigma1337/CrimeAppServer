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
      title: "Live Call!",
      body: req.body.message
    },
    token: receivedToken
    // token: "eXaCwhcqR2m9IwIginxiJY:APA91bEj8ZShf_-ynopGJciigSA5RojdUnMCsyLFRjytdrvHmTfJzyvCLwYfn1N9G7g6VtBvcwlVyIxzvEZ8TlVFiP9gSZuhz48Yd1qhKzNIEx7hObv1busAEtPo1TqP1nHjvFljiHLO",
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