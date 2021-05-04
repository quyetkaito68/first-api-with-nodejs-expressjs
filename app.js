const { response } = require('express');
const express = require('express')
const port = 3002;
const app = express()
const bodyParser = require('body-parser');
const routes = require('./routes');
const mysql = require('mysql');


// routes(app);

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api',
})

// Start the server(cũ)
/*
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});
*/

// Start the server(mới)
// Listen on enviroment port (3002)
app.listen(port, () => console.log(`Listening on port ${port}`))

/* Use Node.js body parsing middleware (đã cũ)
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true,
}));
*/

//Use Node.js body parsing middleware(mới)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//hiển thị dự liệu tĩnh
// app.get('/users', (request, response) => {
//     response.send(users);
// });


// Display all users - hiển thị dữ liệu động
// app.get('/users', (request, response) => {
//     pool.query('SELECT * FROM users', (error, result) => {
//         if (error) throw error;

//         response.send(result);
//     });
// });

//hiển thị từ xamppDB
app.get('/users', (req, res) => {
    pool.getConnection((err, connection) => {

        if (err) throw err
        console.log('connected as id' + connection.threadId)

        connection.query('SELECT * FROM users', (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })

    })
})

//get by id
app.get('/users/:id', (req, res) => {
    pool.getConnection((err, connection) => {

        if (err) throw err
        console.log('connected as id' + connection.threadId)

        connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })

    })
})

//delete
app.delete('/users/:id', (req, res) => {
    pool.getConnection((err, connection) => {

        if (err) throw err
        console.log('connected as id' + connection.threadId)

        connection.query('DELETE FROM users WHERE ID = ?',[req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.send('User in record ID = ' + [req.params.id] + ' has been removed.')
            } else {
                console.log(err)
            }
            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })

    })
})


//post - thêm mới
app.post('/users', (req, res) => {
    pool.getConnection((err, connection) => {

        if (err) throw err
        const params = req.body
        console.log('connected as id' + connection.threadId)

        connection.query('INSERT INTO users SET ?',params, (err, rows) => {
            connection.release()
            if (!err) {
                res.send('Added')
            } else {
                console.log(err)
            }
            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })

    })
})


//put  - cập nhật
app.put('/users/:id', (req, res) => {
    pool.getConnection((err, connection) => {


        if (err) throw err

        const {id,name,email} = req.body


        console.log('connected as id' + connection.threadId)

        connection.query('UPDATE users SET name = ?, email=? WHERE id = ?',[name,email,id], (err, rows) => {
            connection.release()
            if (!err) {
                res.send('Updated')
            } else {
                console.log(err)
            }
            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })

    })
})





