const express = require('express')
const app = express();
const PORT = 8080;


var data = {
    "doctors" :[
        {
            "id": 1,
            "firstName" : "Hibbert",
            "lastName" : "Julius",
            // "appointments" : [
            //     {
            //         "id": 1,
            //         "patient" : {
            //             "id": 1,
            //             "firstName" : "John",
            //             "lastName" : "Xia"
            //         },
            //         "startTime": new Date('March 13, 08 04:20'),
            //         "endTime": new Date('March 13, 08 04:30'),
            //         "kind" : "NEWPATIENT",
                  
            //     }
            // ]
        },
        {
            "id": 2,
            "firstName" : "Krieger",
            "lastName" : "Algemop",
            // "appointments" : [
            //     {
            //         "id": 1,
            //         "patient" : {
            //             "id": 1,
            //             "firstName" : "Sterling",
            //             "lastName" : "Archer"
            //         },
            //         "startTime": new Date('March 13, 08 04:20'),
            //         "endTime": new Date('March 13, 08 04:30'),
            //         "kind" : "NEWPATIENT",
                    
            //     },{
            //         "id": 2,
            //         "patient" : {
            //             "id": 2,
            //             "firstName" : "John",
            //             "lastName" : "Xia"
            //         },
            //         "startTime": new Date('March 13, 08 04:20'),
            //         "endTime": new Date('March 13, 08 04:30'),
            //         "kind" : "FOLLOWUP",
            //     },{
            //         "id": 3,
            //         "patient" : {
            //             "id": 3,
            //             "firstName" : "John",
            //             "lastName" : "Xia"
            //         },
            //         "startTime": new Date('March 13, 08 04:20'),
            //         "endTime": new Date('March 13, 08 04:30'),
            //         "kind" : "FOLLOWUP",
            //     },{
            //         "id": 4,
            //         "patient" : {
            //             "id": 4,
            //             "firstName" : "John",
            //             "lastName" : "Xia"
            //         },
            //         "startTime": new Date('March 13, 08 04:20'),
            //         "endTime": new Date('March 13, 08 04:30'),
            //         "kind" : "NEWPATIENT",
            //     },{
            //         "id": 5,
            //         "patient" : {
            //             "id": 5,
            //             "firstName" : "John",
            //             "lastName" : "Xia"
            //         },
            //         "startTime": new Date('March 13, 08 04:20'),
            //         "endTime": new Date('March 13, 08 04:30'),
            //         "kind" : "NEWPATIENT",
            //     }
            // ]
        },
        {
            "id": 3,
            "firstName" : "Nick",
            "lastName" : "Riviera",
            "appointments" : [

            ]
        }
    ]
};

//var data = {};
function isTimeValid(startTime) {
    return startTime.getMinutes() % 15 == 0;
}

function hasLessThan4AppointmentsWithSameTime(doctor, startTime) {
    var appointments = doctor.appointments || [];
    var appointmentCount = 0;
    for(var i = 0; i < appointments.length; i++) {
        var existingStartTime = appointments[i].startTime;
        if(existingStartTime.getTime() == startTime.getTime()) {
            appointmentCount++;
        }
    }
    return appointmentCount < 3;
}

function addAppointment (doctor, appointment) {
    var startTime = appointment.startTime;
    var appointments = doctor.appointments || [];
    var response = {message: "Appointment not added"};
    if(isTimeValid(startTime) && hasLessThan4AppointmentsWithSameTime(doctor, startTime)) {
        appointments.push(appointment);
        response = {message: "Appointment added"}
    }
    doctor.appointments = appointments;
    return response;
}

function doPostAppointments (req, res) {
    var doctors = data.doctors || {};
    var response = {message: "Doctor not found"};
    var appointment = {
        "id": req.body.id,
        "patient" : req.body.patient,
        "startTime": new Date(req.body.startTime),
        "endTime": new Date(req.body.endTime),
        "kind" : req.body.kind
    }
    for(var i = 0; i < doctors.length; i++) {
        if(req.query.doctorId == doctors[i].id) {
            response = addAppointment(doctors[i], appointment);
        }
    }
    res.status(200).send(response)
}

function doGetDoctors (req, res) {
    var response = JSON.parse(JSON.stringify(data)); //deep copy the data
    var doctors = response.doctors || {};
    for(var i = 0; i < doctors.length; i++) {
        delete doctors[i]['appointments'];
    }
    res.status(200).send(response)
}

function doGetAppointments (req, res) {
    var doctors = data.doctors || {};
    for(var i = 0; i < doctors.length; i++) {
        if(req.query.doctorId == doctors[i].id) {
            res.status(200).send(doctors[i].appointments);
        }
    }
    res.status(200).send({message: "Doctor not found"})
}

function doDeleteAppointments (req, res) {
    var doctors = data.doctors || {};
    for(var i = 0; i < doctors.length; i++) {
        if(req.query.doctorId == doctors[i].id) {
            var appointments = doctors[i].appointments || [];
            for(var j = 0; j < appointments.length; j++) {
                if(req.query.appointmentId == appointments[j].id) {
                    appointments.splice(j, 1);
                    res.status(200).send({message: "Appointment deleted"});
                }
            }
            res.status(200).send({message: "Apointment not found"})
        }
    }
    res.status(200).send({message: "Doctor not found"})
}


app.use(express.json());
app.get('/doctors', doGetDoctors);
app.get('/appointments', doGetAppointments);
app.post('/appointments', doPostAppointments);
app.delete('/appointments', doDeleteAppointments);

app.listen(PORT, () => console.log('alive'));

