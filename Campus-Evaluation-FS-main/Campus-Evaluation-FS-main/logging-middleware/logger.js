import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzEyMDc3QG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NjkzOTAsImlhdCI6MTc4Mjk2ODQ5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU0NmJhYmZiLWM4NzQtNDZiMS04ZDEwLTA0MzI3NmZkODBmOSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByYXZlZW5rdW1hciIsInN1YiI6ImUyM2NiN2UxLTczZjQtNGI5MS04Y2ViLTQwMzZkMjBhODQzOCJ9LCJlbWFpbCI6IjIzMTIwNzdAbmVjLmVkdS5pbiIsIm5hbWUiOiJwcmF2ZWVua3VtYXIiLCJyb2xsTm8iOiIyMzEyMDc3IiwiYWNjZXNzQ29kZSI6IkVSelV5eCIsImNsaWVudElEIjoiZTIzY2I3ZTEtNzNmNC00YjkxLThjZWItNDAzNmQyMGE4NDM4IiwiY2xpZW50U2VjcmV0IjoiWm5UQURBdktVY0NDS2NmayJ9.i4YB8dBcXJFjQmQqMhZVdL0BmSprDQhlHR4r1h04gCI";

export async function Log(stack, level, packageName, message) {
  try {
    await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  } catch(err) {
    console.log("Logger Error:", err.message);
  }
}