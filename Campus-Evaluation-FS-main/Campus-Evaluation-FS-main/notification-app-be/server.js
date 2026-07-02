import express from "express";
import {getNotifications} from "./controllers/notification.controller.js";

const app = express();

app.get("/notifications", getNotifications);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});