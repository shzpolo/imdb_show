var express = require('express');


var app = express();
app.get('/testq', function (req, res) {
    var q = req.query.q;
    if(q === undefined) {
        res.send('Why you not send qqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    }
    else{
        res.send("Your q's value is "+q);
    }
});
app.listen(3000, function (req, res) {
    console.log('Running...')
});
