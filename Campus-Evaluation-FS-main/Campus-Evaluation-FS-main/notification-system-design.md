# Notification System Design
Stage 1

Header: (common for all requests)

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzEyMDc3QG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NjkzOTAsImlhdCI6MTc4Mjk2ODQ5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU0NmJhYmZiLWM4NzQtNDZiMS04ZDEwLTA0MzI3NmZkODBmOSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByYXZlZW5rdW1hciIsInN1YiI6ImUyM2NiN2UxLTczZjQtNGI5MS04Y2ViLTQwMzZkMjBhODQzOCJ9LCJlbWFpbCI6IjIzMTIwNzdAbmVjLmVkdS5pbiIsIm5hbWUiOiJwcmF2ZWVua3VtYXIiLCJyb2xsTm8iOiIyMzEyMDc3IiwiYWNjZXNzQ29kZSI6IkVSelV5eCIsImNsaWVudElEIjoiZTIzY2I3ZTEtNzNmNC00YjkxLThjZWItNDAzNmQyMGE4NDM4IiwiY2xpZW50U2VjcmV0IjoiWm5UQURBdktVY0NDS2NmayJ9.i4YB8dBcXJFjQmQqMhZVdL0BmSprDQhlHR4r1h04gCI

Endpoint: Get /notifications

Request Body:
{
    
}

Response:
{
    "notifications": [
        {
            "ID": "jnwkdjf-ref-ref-regfrfc",
            "Type": "Result",
            "Message": "mid-sem",
            "Timestamp": "2026-04-22 17:51:30"
        },
        {
            "ID": "sdf-dfdafe-dfae-daxa",
            "Type": "Placement",
            "Message": "CSX Corporation Hirinh",
            "Timestamp": "2026-04-22 17:51:18"
        }
    ]
}

Endpoint: Patch /notifications/:id/read

Request Body:
{
    
}

Response:
{
    "success": "true",
    "message": "Notification marked as read"
}

Endpoint: Delete /notifications/:id

Request Body:
{

}

Response:
{
    "success": "true",
    "message": "Notification deleted"
}

Endpoint: Patch /notifications/read-all

Request Body:
{

}

Response:
{
    "success": "true",
    "message": "All Notification marked as read"
}
