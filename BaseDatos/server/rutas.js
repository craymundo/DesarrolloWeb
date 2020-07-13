const RouterCalendar = require('express').Router();
const Calendars = require('./model/calendar.js')

RouterCalendar.get('/all', function(req, res) {
    Calendars.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

RouterCalendar.post('/new', function(req, res) {
    let calendar = new Calendars({
        id: Math.floor(Math.random() * 50),
        title: req.body.title,
        start: req.body.start,
        end: req.body.end
    })
    calendar.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})

RouterCalendar.post('/update', function(req, res) {

    Calendars.updateOne(
      { id : req.body.id },
      { $set: { start : req.body.start }} , 

      (function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro actualizado")
      })


    )
})

RouterCalendar.post('/delete/:id', function(req, res) {
    let uid = req.body.id
    Calendars.remove({id: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})

module.exports = RouterCalendar
