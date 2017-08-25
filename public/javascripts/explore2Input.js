$(document).ready(function () {
    getNews();
    var p = $('p#query');
    var name = p.attr('name');
    var keyword = p.attr('keyword');
    if(name && keyword) {
        getResult(name, keyword);
    }
    $('#searchButton').click(function() {
        name = $("#searchMethod").val().toLowerCase();
        if(name == 'type')
            name = 'tag1';
        keyword = $('#searchContent').val();

        $("table#resultTable tr:not(:first)").empty();
        getResult(name, keyword);
    });

    function getResult(name, keyword) {
        $.getJSON('dao/search', {name: name, keyword: keyword}, function(result) {
            p.text('You want to use ' + name + ' to search ' + keyword);
            if(result.stat === 'OK') {
                for(var i=0; i<result.datas.length; i++){
                    var data = result.datas[i];
                    var td_title = (data.title) ? data.title : '???';
                    var td_star = (data.star) ? data.star : '!!!';
                    var tr_type = (data.type) ? data.type : 0;

                    var newRow = "<tr cast_id=\""  + td_title +
                        "\"><td>" +
                        td_title + "</td><td>" +
                        td_star + "</td><td>" +
                        tr_type + "</td></tr>";
                    $('#firstHead').after(newRow);
                }
                p.text("Read Complete!");
            }
            else if(result.stat === 'NotFound') {
                $('#query').text(' Not Found News.');
            }
            else {
                $('#query').text(' Error!');
            }
        });
    }
    function getNews(){
        $.getJSON('crawler/news',{numOfBlock: 3}, function(result){
            if(result.stat === 'OK') {
                for(var i=0; i<result.news.length; i++){
                    var newLi = '<li><a class="newsLine" href="'+result.news[i].link+'">'+result.news[i].title+'</a></li>';
                    $('ul#newsUl').append(newLi);
                }
            }
            else if(result.stat === 'NotFound') {
                $('#query').text(' Not Found News.');
            }
            else {
                $('#query').text(' Error!');
            }
        });
        $.getJSON('crawler/topNews', function(result) {
            if(result.stat == 'OK') {
                $('p#topLineTitle').text(result.topTitle);
                $('img#topLinePic').attr('src', result.topImg);
                $('a#topLineLink').attr('href', result.topLink);
            }
            else if(result.stat === 'NotFound') {
                $('#query').text(' Not Found News.');
            }
            else {
                $('#query').text(' Error!');
            }
        });
    }
});