var MongoClient = require('mongodb').MongoClient;
var dbo, students, rooms;
module.exports = function (io) {

    io.on('connection', function (socket) {
        socket.on('message', function (data) {
            console.log(data);
            addNewStudents(data);
        });
    });


    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        dbo = db.db('virtual_classroom');
        students = dbo.createCollection('Students');
        rooms = dbo.createCollection('rooms');
    });




console.log("hello user");





}
addNewStudents = function (data)
{

    // students.
    dbo.collection("students").insertOne(data, function (err, res) {
        if (err)
            throw err;
        console.log("1 document inserted");
        //db.close();
    });
}

exports.addNewRoom = function (newData, callback)
{
    dbo.collection("customers").findOne({}, function (err, result) {
        if (err)
            throw err;
        console.log(result.name);
        db.close();
    });

    rooms.findOne({room_name: newData.room_name}, function (e, o) {
        if (o) {
            callback('room-taken');
        } else {
            // append date stamp when record was created //
            newData.status = "Active";
            newData.date_created = moment().format('MMMM Do YYYY, h:mm:ss a');
            rooms.insertOne(newData, function (err, res) {
                if (err)
                    throw err;
                console.log("1 document inserted");
                db.close();
            });


        }

    });
}
console.log("sssssddd");