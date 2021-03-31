const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4800');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());


//Mysql
const connection = mysql.createConnection({
    host: '192.168.64.3',
    user: 'cesar',
    password: '123456',
    database: 'shopping'
})

//ROUTE

app.get('/', (req, res) => {
    res.send('Welcome to my API!!!');
});

// validate access
app.post('/authentication', (req, res) => {
    const { username, password} = req.body;
    console.log('account:', username, ' password:', password);
    const sql = `select * from user where account ='${username}'
    and password = '${password}' `;
    connection.query(sql, (error, results) => {
        let body = {};
        if(error) throw error;
        if(results.length > 0) {
             body = {
                code : 0,
                message: '',
                data: results[0]
            }
            res.json(body);
        } else {
            body = {
                code : 1,
                message: 'Error en el inicio de sesión',
                data: []
            }
            res.json(body);
        };
    })
})

app.get('/products', (req, res) => {
    const sql = 'select * from product';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0)
            res.json(results);
        else
            res.send('Not result');
    })
})

connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on por ${PORT}`));
