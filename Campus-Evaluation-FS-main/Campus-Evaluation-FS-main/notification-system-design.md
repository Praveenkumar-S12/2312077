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

Stage 2

Why MongoDB:

I will use a MongoDB for DataBase connection. Because it is having a flexible schema for notification data, easy horizontal scaling without modifiying existing data, and it is also suitable for storing such a large volume of notifications.

Schema:

{
  "_id": "Id",
  "userId": "Id",
  "message": "Amazon recruirtment starts tomorrow.",
  "type": "placement",
  "isRead": false,
  "createdAt": "2026-07-02",
  "updatedAt": "2026-07-02"
}

Problems when more data:

slower queries, mainly when geting unread notifications

Solution:

create index on userId and isRead
use pagination when retriving notifications

Queries:

get all notifications:

db.notifications.find({userId}).sort({createdAt: -1});

mark notification as read:

db.notifications.updateOne(
  {_id: notificationId, userId},
  {
    $set: {
      isRead: true,
      updatedAt: new Date()
    }
  }
);

mark notification as read:

db.notifications.updateMany(
  {userId, isRead: false},
  {
    $set: {
      isRead: true,
      updatedAt: new Date()
    }
  }
);

delete notification:

db.notifications.deleteOne({
  _id: notificationId,
  userId
});

Stage 3:

the given query is syntatically and logic wise correct, but it needs performance optimisation

to solce this create a composite index on (studentId, isRead, createdAt)
now it will be efficient, and the advise is efficient

select distinct studentId
from Notifications
where notificationType = 'placement'
and createdat >= now() - interval 7 day;

Stage 4

I will implement a reddis cache , which stored data in a middle place, and data is fetched from db, only when it is not in cache. it improves the performance

Stage 5
first save the notifications in db
and then send notifications through any message que like SQS. this should be used in a async function and store sent status, when failed, continue from failiure point

notify_all(student_ids, message):
    for student_id in student_ids:
        save_to_db(student_id, message)
        queue_email(student_id, message)
        queue_push_notification(student_id, message)

process_email_queue()
process_push_notification_queue()