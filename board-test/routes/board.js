var express = require('express');
var board = express.Router();
var mariadb = require('../database/connect');

board.get('/', function(req, res){
    res.send('hi board page');
});

board.get('/list', async (req, res) => {
    let conn;
    try{
	    conn = await mariadb.pool.getConnection();
	    var rows = await conn.query('SELECT b_num as idx, b_title as title, u_id as name FROM Board, User WHERE b_writer = u_code');
	    res.render('list', {rows:rows});
    }
    catch(err){
	    throw err;
    }
    finally{
	    if (conn) conn.release();
    }
});

board.get('/write', function(req, res){
    res.render('write');
});

board.post('/write', async (req, res) => {
    let conn;
    try{
	    b = req.body	
	    conn = await mariadb.pool.getConnection();
	    var rows = await conn.query('SELECT COUNT(*) AS idx FROM Board');
	    rows = await conn.query('INSERT INTO Board VALUES(?, ?, ?, ?, ?, ?)', [rows[0].idx + 1, 'a', b.title, b.content, '11111111g', 'AA'])	
    } 
    catch (err){
	    throw err;
    }
    finally{
	    res.redirect('/board/page');
	    if (conn) conn.release();
    }	
});

board.get('/read/:idx', async (req, res) => {
    let conn;
    try{
	    var idx = req.params.idx;
	    conn = await mariadb.pool.getConnection();
	    var rows = await conn.query('SELECT b_title as title, u_id as id, content FROM Board, User WHERE b_num = ?', [idx]);
	    res.render('read', {idx:idx, row:rows[0]});
    }
    catch(err){
	    throw err;
    }
    finally{
	    if (conn) conn.release();
    }
});

board.post('/update', async (req, res) => {
    let conn;
    try{
	    b = req.body
	    conn = await mariadb.pool.getConnection();
	    var rows = await conn.query('UPDATE Board SET content = ? WHERE b_num = ?', [b.content, b.idx]);
	    res.redirect('/board/page');
    }
    catch(err){
	    throw err;
    }
    finally{
	    if (conn) conn.release();
    }
});

board.get('/page', function(req, res){
    res.redirect('/board/page/1');
});

board.get('/page/:page', async (req, res) => {
    let conn;
    try{
        var page = req.params.page;
	    conn = await mariadb.pool.getConnection();
	    var rows = await conn.query('SELECT b_num as idx, b_title as title, u_id as name FROM Board, User WHERE b_writer = u_code');
	    res.render('page', {rows:rows, page:page, page_num:5, pass:true});
    }
    catch(err){
	    throw err;
    }
    finally{
	    if (conn) conn.release();
    }
});

board.post('/delete', async (req, res) => {
    let conn;
    try{
	    b = req.body
	    conn = await mariadb.pool.getConnection();
	    var rows = await conn.query('DELETE FROM Board WHERE b_num = ?', [b.idx]);
    }
    catch(err){
	    throw err;
    }
    finally{
        res.redirect('/board/page');
	    if (conn) conn.release();
    }
});


module.exports = board;