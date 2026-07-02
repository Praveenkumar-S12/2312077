import axios from "axios";
import {Log} from "../../logging-middleware/index.js";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzEyMDc3QG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NjkzOTAsImlhdCI6MTc4Mjk2ODQ5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU0NmJhYmZiLWM4NzQtNDZiMS04ZDEwLTA0MzI3NmZkODBmOSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByYXZlZW5rdW1hciIsInN1YiI6ImUyM2NiN2UxLTczZjQtNGI5MS04Y2ViLTQwMzZkMjBhODQzOCJ9LCJlbWFpbCI6IjIzMTIwNzdAbmVjLmVkdS5pbiIsIm5hbWUiOiJwcmF2ZWVua3VtYXIiLCJyb2xsTm8iOiIyMzEyMDc3IiwiYWNjZXNzQ29kZSI6IkVSelV5eCIsImNsaWVudElEIjoiZTIzY2I3ZTEtNzNmNC00YjkxLThjZWItNDAzNmQyMGE4NDM4IiwiY2xpZW50U2VjcmV0IjoiWm5UQURBdktVY0NDS2NmayJ9.i4YB8dBcXJFjQmQqMhZVdL0BmSprDQhlHR4r1h04gCI";

const weight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export async function getTopNotifications() {
  await Log("backend", "info", "service", "Fetching notifications");

  const { data } = await axios.get(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  const notifications = data.notifications;
  
  notifications.sort((a, b) => {
    const scoreA =
      weight[a.Type] * 1000000000 + new Date(a.Timestamp).getTime();
    const scoreB =
      weight[b.Type] * 1000000000 + new Date(b.Timestamp).getTime();

    return scoreB - scoreA;
  });

  await Log("backend", "info", "service", "Priority calculated");

  return notifications.slice(0, 10);
}