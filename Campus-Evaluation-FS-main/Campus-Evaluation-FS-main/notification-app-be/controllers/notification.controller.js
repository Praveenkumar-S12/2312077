import {getTopNotifications} from "../services/notification.service.js";
import {Log} from "../../logging-middleware/index.js";

export async function getNotifications(req, res) {
  try {
    await Log("backend", "info", "controller", "Request received");
    const data = await getTopNotifications();
    res.json(data);
    await Log("backend", "info", "controller", "Response sent");
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}