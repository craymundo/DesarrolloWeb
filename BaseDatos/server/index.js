const http = require('http'),
      path = require('path'),
      RoutingLogin = require('./login'),
      RoutingCalendar = require('./rutas'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

const PORT = 8082
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/bd')


app.use(express.static('cliente'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/events', RoutingCalendar) 
app.use('/login', RoutingLogin)

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
