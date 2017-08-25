$(document).ready(function () {
    location.hash = "#guide";
    var page = !$('#guide').attr('pages')? 1 : $('#guide').attr('pages');
    for(var i=0; i<3; i++) {
        var pic = $('img.poster').eq(i);
        pic.attr('order', i+1);
    }
    setInterval(function() {
        for(var i=0; i<3; i++) {
            var pic = $('img.poster').eq(i);
            var order = pic.attr('order');
            order = parseInt(order);
            order += 3;
            if(order >=22)
                order -= 21;
            pic.attr('order', order);
            var src = 'public/images/'+ order +'.jpg';
            pic.attr('src', src);
        }
    }, 5000);
    createIndexTable();
    createBtns();

    $('#prevA').attr('href', '/index?pages='+((page>1)?(parseInt(page)-1):1));
    $('#nextA').attr('href', '/index?pages='+((page<300)?(parseInt(page)+1):300));

    function createIndexTable() {
        $.getJSON('dao/indexMovie', {amount: 100, page: page}, function (result) {
            if (result.stat === 'OK') {
                for(var i=0; i<result.datas.length; i++){
                    var data = result.datas[i];
                    var td_title = (data.title) ? data.title : 'DeadPool';
                    var td_star = (data.star) ? data.star : 'Love';
                    var td_type = (data.type) ? data.type : 'U!';
                    var td_year = (data.year) ? data.year : 'Not Recorded';

                    var newRow = "<tr imdb_id=\"" + data.imdb_id +
                        "\"><td><a href='/search?imdb_id="+
                        data.imdb_id + "'>" +
                        td_title + "</a></td><td>" +
                        td_star + "</td><td>" +
                        td_type + "</td><td>" +
                        td_year + "</td></tr>";
                    $('#tableHead').after(newRow);
                }
                //createSearch();
            }
            else if (result.stat === 'NotFound') {
                $('#query').text(' Not Found Anything.');
            }
            else {
                $('#query').text(' Error!');
            }
        });
    }


    function createBtns() {
        for(var i=7; i>=0; i--) {
            if(page < 5) {
                if(page == (i+1)) {
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages='+(i+1)+'">'+
                        '<button class = "btn btn-page btn-default active btn-block text-center btn-page">' +
                        (i+1) + '</button></a></div>';
                    $('#prev').after(numBtn);
                }
                else if(i == 6) {
                    var numBtn = '<div class="col-xs-1 page text-center dotDiv">. . . . . .</div>';
                    $('#prev').after(numBtn);
                }
                else if(i == 7) {
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages=300">'+
                        '<button class = "btn btn-page btn-default btn-block text-center btn-page" >' +
                        '300</button></a></div>';
                    $('#prev').after(numBtn);
                }
                else{
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages='+(i+1)+'">' +
                        '<button class = "btn btn-page btn-default btn-block text-center btn-page">' +
                        (i+1) + '</button></a></div>';
                    $('#prev').after(numBtn);
                }
            }
            else if(page > 296) {
                if(page == 300-(7-i)) {
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages='+(300-(7-i))+'">' +
                        '<button class = "btn btn-page btn-default active btn-block text-center btn-page">' +
                        (300-(7-i)) + '</button></a></div>';
                    $('#prev').after(numBtn);
                }
                else if(i == 1) {
                    var numBtn = '<div class="col-xs-1 page text-center dotDiv">. . . . . .</div>';
                    $('#prev').after(numBtn);
                }
                else if(i == 0) {
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages=1">' +
                        '<button class = "btn btn-page btn-default btn-block text-center btn-page">'+
                        '1</button></a></div>';
                    $('#prev').after(numBtn);
                }
                else{
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages='+(300-(7-i))+'">' +
                        '<button class = "btn btn-page btn-default btn-block text-center btn-page">' +
                        (300-(7-i)) + '</button></a></div>';
                    $('#prev').after(numBtn);
                }
            }
            else{
                if(i == 3) {
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages='+page+'">' +
                        '<button class = "btn btn-page btn-default active btn-block text-center btn-page">' +
                         page + '</button></a></div>';
                    $('#prev').after(numBtn);
                }
                else if(i == 6 || i == 1) {
                    var numBtn = '<div class="col-xs-1 page text-center dotDiv">. . . . . .</div>';
                    $('#prev').after(numBtn);
                }
                else if(i == 7) {
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages=300">'+
                        '<button class = "btn btn-page btn-default btn-block text-center btn-page">' +
                        '300</button></a></div>';
                    $('#prev').after(numBtn);
                }
                else if(i == 0) {
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages=1">' +
                        '<button class = "btn btn-page btn-default btn-block text-center btn-page">' +
                        '1</button></a></div>';
                    $('#prev').after(numBtn);
                }
                else{
                    var numBtn = '<div class="col-xs-1 page">' +
                        '<a class="page_a" href="/index?pages='+(page-3+i)+'">' +
                        '<button class = "btn btn-page btn-default btn-block text-center btn-page">'
                        + (page-3+i) + '</button></a></div>';
                    $('#prev').after(numBtn);
                }
            }
        }
    }
});