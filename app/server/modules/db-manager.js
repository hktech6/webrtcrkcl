var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');
var uniqid = require('uniqid');
var dbo, students, rooms;

MongoClient.connect("mongodb://localhost:27017", function (err, db) {
    dbo = db.db('virtual_classroom');
    students = dbo.createCollection('Students');
    dbo.createCollection('rooms');
    rooms =  dbo.collection("rooms");
});


exports.addNewRoom = function (newData, callback)
{
    
console.log(newData);
     rooms.findOne({room_name: newData.room_name}, function (e, o) {
        if (o) {
            callback('room-taken');
        } else {
            // append date stamp when record was created //
            newData.status = "Active";
            newData.room_id = uniqid();
            newData.date_created = moment().format('DD MM YYYY, h:mm:ss');
            rooms.insertOne(newData, function (err, res) {
                if (err)
                    throw err;
                console.log("1 document inserted");
                
            });


        }

    });
}
