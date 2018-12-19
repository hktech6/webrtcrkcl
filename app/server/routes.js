
var DBM = require('./modules/db-manager');


module.exports = function (app) {
    //console.log(app);
    app.get('/', function (req, res) {
        res.render('home', {title: 'Hello - Please Login To Your Account'});
    });

    app.get('/rooms', function (req, res) {
        res.render('rooms', {title: 'Hello - Please Login To Your Account'});
    });

    app.post('/rooms_add', function (req, res) {
        console.log("ss");
        
        DBM.addNewRoom({
            room_name: req.body['room_name']            
        }, function (e) {
            if (e) {
                res.status(400).send(e);
            } else {
                res.status(200).send('ok');
            }
        });
    });

};
