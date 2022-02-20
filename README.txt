Testing Steps

In console type npm install
type node . to start the server
begin testing with postman or other api tool

Notes
startTime and endTime are string that will be used in a javascript Date constructor
endTime is not being used in code
patient id is not being used in code

Example testing URLS and body from postman
GET http://localhost:8080/appointments?doctorId=2
GET http://localhost:8080/doctors
DELETE http://localhost:8080/appointments?doctorId=2&appointmentId=5
POST http://localhost:8080/appointments?doctorId=2
body for post 
{
    "id": 5,
    "patient" : {
        "id": 5,
        "firstName" : "John",
        "lastName" : "Xia"
    },
    "startTime": "March 13, 08 04:30",
    "endTime": "March 13, 08 04:30",
    "kind" : "NEWPATIENT"
}

Design Decisions, Questions and assumptions

Can Doctor have 3 overlapping appointments? There was no length of appointment given
- Yes

Do we need authentication such as bearer token?
- No

if the same patient signs up for 2 appointments with different doctors with same time?
- Will never happen

Why attach list of appointments to the doctor instead of having its own object with a primary key tied to the doctor?
- To save time, having its own table would be better for more scaleable application

Why NodeJs and Express?
Easy setup and testing is only reason

Obviously there are many other concerns, issues but just wanted to give some brief insight into my thinking process

