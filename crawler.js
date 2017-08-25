var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var Iconv = require('iconv-lite');

var crawler = express();

crawler.get('/crawl', function (req, res) {
    var type = req.query.type;
    if(type === undefined){
        res.status(400).json({stat: 'NotFound'});
    }
    else if(type === 'one'){
        request('https://cnodejs.org/', function (error, response, body) {
            if (!error && res.statusCode == 200) {
                var $ = cheerio.load(body);
                var firstTitle= $("a.topic_title").eq(5).attr('title');
                var firstRelies = $("span.count_of_replies").eq(0).text();
                var firstLastTime = $("span.last_active_time").eq(0).text();
                res.json({stat: 'OK', title: firstTitle, replies: firstRelies, lastTime:firstLastTime});
            }
            else {
                res.status(500).json({stat: 'Error'});
            }
        });

    }
});
crawler.get('/news', function(req, res) {
    request('http://news.baidu.com/', function (error, response, body) {
        if (!error && res.statusCode == 200) {
            var readingBlock = !req.query.numOfBlock ? 3 : req.query.numOfBlock;
            var $ = cheerio.load(body);
            //background-image:url(https://imgsa.baidu.com/news/q%3D100/sign=9d3c5e3ca9cc7cd9fc2d30d909002104/d058ccbf6c81800a284bccdfbb3533fa838b47b0.jpg)
            var json = [];
            for(var i=0; i<parseInt(readingBlock); i++) {
                var oli = $('ul.ulist').eq(i).find('li');
                for(var j=0; j<oli.length; j++){
                    json.push({
                        title: oli.eq(j).find('a').text(),
                        link: oli.eq(j).find('a').attr('href')
                    });

                }
            }
            res.status(200).json({
                stat: 'OK',
                news: json
            });
        }
        else {
            res.status(500).json({stat: 'Error'});
        }
    });
});
crawler.get('/topNews',  function(req, res) {
    request({url:'http://news.sohu.com/',gzip:true, encoding: null}, function (error, response, body) {
        if (!error && res.statusCode == 200) {

            var $ = cheerio.load(Iconv.decode(body, 'gb2312'));
            var topLineImage= $("div.l div.focus-now div.pic a img").attr('src');
            //background-image:url(https://imgsa.baidu.com/news/q%3D100/sign=9d3c5e3ca9cc7cd9fc2d30d909002104/d058ccbf6c81800a284bccdfbb3533fa838b47b0.jpg)
            var topLineLink= $("div.l div.focus-now div.pic a").attr('href');
            var topLinkTitle = $("div.l div.focus-now div.txt-txt a").text();

            res.status(200).json({
                stat: 'OK',
                topTitle: topLinkTitle,
                topImg: topLineImage,
                topLink: topLineLink
            });
        }
        else {
            res.status(500).json({stat: 'Error'});
        }
    });
});
crawler.get('/poster', function (req, res) {
    var name = req.query.name;
    if(name === undefined){
        res.status(400).json({stat: 'NotFound'});
    }
    request('http://www.imdb.com/title/'+name, {ref_: 'inth_ov_tt'}, function (error, response, body) {
        if (!error && res.statusCode == 200) {
            var $ = cheerio.load(body);
            var poster= $("div.poster img");
            res.status(200).json({stat: 'OK', src: poster.attr('src')});
        }
        else {
            res.status(500).json({stat: 'Error'});
        }
    });

});

module.exports = crawler;