var express = require('express');
var user = express.Router();
var mariadb = require('../database/connect');

user.get('/', function(req, res){
    res.send('hi user page');
});


user.get('/register', function(req, res){
    res.render('register');
});

user.post('/register', async (req, res) => {
    let conn;
    try{
	b = req.body
	var data = [b.phone + b.cat, b.id, b.pw, b.name, b.kg]
	
	conn = await mariadb.pool.getConnection();
	const rows = await conn.query('INSERT INTO User VALUES (?, ?, ?, ?, ?)', data);
	console.log('registered successfully : ', data);
    }
    catch(err){
	throw err;
    }
    finally{
	if (conn) conn.release();
    }
});


user.get('/login', function(req, res){
    res.render('login');
});

user.post('/login', async (req, res) => {
    try{
	b = req.body	
	conn = await mariadb.pool.getConnection();
	const rows = await conn.query('SELECT * FROM User WHERE u_id = ?', [b.id])
	if (rows.length > 0 && rows[0].u_pw == b.pw){
	    res.status(200).send('login success');
	} 
	else {
	    res.send('wrong account');
	}
    }
    catch (err){
	throw err;
    }
    finally{
	if (conn) conn.release();
    }	
});

module.exports = user;
