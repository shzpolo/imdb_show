var request = require('request');
var mysql = require('mysql');
var express = require('express');

var dao = express();
var first = true;
var connection = mysql.createConnection({
    host     : '172.17.60.108',
    user     : 'hz',
    password : 'hz123456',
    database : 'test_hz'
});

dao.get('/select', function (req, res) {
    var name = req.query.name;
    var key = req.query.key;
    if(name === undefined || key === undefined){
        res.status(400).json({stat: 'NotFound'});
    }
    connection.connect();

});
dao.get('/search', function (req, res) {
    //select * from movie where title like '%the%'
    var name = req.query.name;
    var keyword = req.query.keyword;
    if(name === undefined || keyword === undefined || keyword === ''){
        res.status(400).json({stat: 'NotFound'});
        return null;
    }
    if(first){
        first = false;
        connection.connect();
    }
    keyword = '%' + keyword + '%';
    connection.query({
        sql: "select * from movie where ?? like ?;",
        timeout: 15000,
        values: [name, keyword]
    }, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if(results.length == 0) {
            res.status(404).json({stat: 'Error'});
        }
        else{
            var json = [];

            for(var i=0; i<Math.min(results.length, 50); i++){
                json.push({imdb_id: results[i].imdb_id,
                    title: results[i].title,
                    star: results[i].stars,
                    type: results[i].tag1,
                    rate: results[i].rate,
                    language: results[i].language,
                    runtime: results[i].runtime,
                    year: results[i].year});
            }
            if(results.length != 0)
                res.status(200).json({stat: 'OK', datas: json});
            else
                res.status(404).json({stat: 'NotFound'});
        }
    });


});

dao.get('/indexMovie', function (req, res) {
    var amount = req.query.amount;
    var page = req.query.page;
    if(amount === undefined || page === undefined){
        res.status(500).json({stat: 'Error'});
    }
    if(first){
        first = false;
        connection.connect();
    }
    connection.query({
        sql: 'select * from movie limit ?,?;',
        timeout: 15000,
        values: [(parseInt(page)-1)*parseInt(amount), parseInt(amount)]
    }, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if(results.length == 0) {
            res.status(404).json({stat: 'Error'});
        }
        else{
            var json = [];

            for(var i=0; i<results.length; i++){
                json.push({imdb_id: results[i].imdb_id,
                             title: results[i].title,
                             star: results[i].stars,
                             type: results[i].tag1,
                             year: results[i].year});
            }
            res.status(201).json({stat: 'OK', datas: json});
        }
    });
});

dao.get('/random', function (req, res) {
    var id = Math.random()*78868 + 11; //tt1431045
    if(first){
        first = false;
        connection.connect();
    }

    connection.query({
        sql: 'select * from movie where id = ?',
        timeout: 10000, // 10s
        values: [parseInt(id)]
    }, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if(results.length == 0) {
            res.status(404).json({imdb_id: 'tt1431045', stat: 'OK'});
        }
        else{
            res.status(201).json({imdb_id: results[0].imdb_id, stat: 'OK', title: results[0].title,
                                   star: results[0].stars, type: results[0].tag1});
        }
    });
});
dao.get('/random2', function (req, res) {
    var id = Math.random()*78868 + 11; //tt1431045
    if(first){
        first = false;
        connection.connect();
    }

    connection.query({
        sql: 'select * from movie where id = ?',
        timeout: 10000, // 10s
        values: [parseInt(id)]
    }, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if(results.length == 0) {
            res.status(404).json({imdb_id: 'tt1431045', stat: 'OK'});
        }
        else{
            res.status(201).json({imdb_id: results[0].imdb_id, stat: 'OK', title: results[0].title,
                star: results[0].stars, type: results[0].tag1});
        }
    });
});
dao.get('/casts', function (req, res) {
    var imdb_id = req.query.imdb_id;
    if(imdb_id === undefined){
        res.status(400).json({stat: 'Error'});
    }
    if(first){
        first = false;
        connection.connect();
    }

    connection.query({
        sql: 'select movie_cast.*, cast.cast_name cast_name from movie_cast ' +
        'inner join cast on movie_cast.cast_id = cast.id ' +
        'where imdb_id = ? order by cast_order',
        timeout: 10000, // 10s
        values: [imdb_id]
    }, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if(results.length == 0) {
            res.status(404).json({stat: 'NotFound'});
        }
        else{
            var json = [];
            for(var i=0; i<results.length; i++){
                json.push(
                    {
                        order: results[i].cast_order,
                        name: results[i].cast_name,
                        imdb_id: results[i].imdb_id,
                        cast_id: results[i].cast_id
                    }
                );

            }
            res.status(200).json({stat: 'OK', datas: json});
        }
    });
});


module.exports = dao;