var bodyParser = require('body-parser'),
    http = require('http'),
    express = require('express'),
    fs = require('fs'),
    path = require('path')
var port = port = process.env.PORT || 3000,
    app = express(),
    Server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/getall', function(req,res) {
     var dataPath = __dirname + path.join('/data/data.json')
     const accounts = () => fs.readFileSync(dataPath, { endoding: 'utf8'})
     const accRead = JSON.parse(accounts())
     res.send(accRead);
})

app.use(express.static('public'))


Server.listen(port, function(){
  console.log("Server Running");
})
