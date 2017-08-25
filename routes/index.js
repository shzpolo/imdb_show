var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node project/ crawler'});
});

router.get('/explore', function(req, res, next) {
    res.render('explore', { title: 'Node project/ crawler'});
});
router.get('/explore2', function(req, res, next) {
    var name=!req.query['name'] ? false : req.query['name'];
    var keyword=!req.query['keyword'] ? false : req.query['keyword'];
    if(name && keyword)
        res.render('explore2', { title: 'Node project/ crawler', name: name, keyword: keyword});
    else
        res.render('explore2', { title: 'Node project/ crawler'});
});

router.get('/index', function(req, res, next) {
    var pages=!req.query['pages'] ? 1 : req.query['pages'];
    res.render('index', { title: 'Node project/ crawler', pages: pages});
});

router.get('/search', function(req, res, next) {
    var imdb_id=!req.query['imdb_id'] ? 'tt1431045' : req.query['imdb_id'];
    res.render('search', { title: 'Node project/ crawler', imdb_id: imdb_id});
});
router.get('/video', function(req, res, next) {
    res.render('videoIndex', { title: 'video share'});
});
router.get('/working', function(req, res, next) {
    res.render('working', { title: 'video share'});
});

module.exports = router;
