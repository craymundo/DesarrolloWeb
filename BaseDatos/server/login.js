const RoutingLogin = require('express').Router();
const Users = require('./model/model.js')

RoutingLogin.post('/acceso', function(req, res) {
    Users.findOne({ usuario: req.body.user , password: req.body.pass }, function (err, adventure) {
       if (err) {
            res.status(500)
            res.json(err)
        }
        res.send("Validado")
    });
})  

module.exports = RoutingLogin ;
