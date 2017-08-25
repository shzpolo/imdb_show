$(document).ready(function () {
    $('#crawlOne').click(function () {
        var number = 'one';
        $('#query').text(' Waiting for response.');
        $.getJSON('crawler/crawl', {type: number}, function (result) {
            if(result.stat === 'OK'){
                var newRow = "<tr><td>"+result.title+"</td><td>"+result.replies+"</td><td>"+result.lastTime+"</td></tr>";
                $('#resultTable').append(newRow);
                $('#query').text(' Read complete.');
            }
            else if(result.stat === 'NotFound'){
                $('#query').text(' Resource not found.');
            }
            else {
                $('#query').text(' Error!');
            }
        });
    });

    var pause = false;
    $('#getImage').click(randomPoster);
    $('#getImage2').click(randomPoster);


    function randomPoster() {
        if(needPause())
            return;
        $.getJSON('dao/random', function (result) {

            if (result.stat === 'OK') {

                var td_title = (result.title) ? result.title : 'DeadPool';
                var td_star = (result.star) ? result.star : 'Love';
                var td_type = (result.type) ? result.type : 'U';

                var newRow = "<tr imdb_id=\"" + result.imdb_id + "\"><td>"+
                    td_title+"</td><td>"+
                    td_star+"</td><td>"+
                    td_type+"</td></tr>";
                $('#resultTable tr:eq(0)').after(newRow);

                var name = result.imdb_id;
                $('tr:eq(1)').click(getPoster);

                $('#query').text(' Mysql rolling complete.' + name);
            }
            else {
                $('#query').text(' Error!');
            }
            $('#query').text(' Waiting for response.');
            $.getJSON('crawler/poster', {name: name}, function (result) {

                if (result.stat === 'OK') {

                    $('#query').text(' Reading poster...');
                    $('#poster').attr("alt", "Reading");
                    $('#poster').attr("src", result.src);

                    $('#query').text(' Read complete.');
                }
                else if (result.stat === 'NotFound') {
                    $('#query').text(' Not Found Anything.');
                }
                else {
                    $('#query').text(' Error!');
                }
            });
        });
    }

    function getPoster() {
        if(needPause())
            return;
        $('#query').text(' Reading poster...');
        $.getJSON('crawler/poster', {name: this.imdb_id}, function (result) {

            if (result.stat === 'OK') {
                $('#poster').attr("alt", "Reading");
                $('#poster').attr("src", result.src);

                $('#query').text(' Read complete.');
            }
            else if (result.stat === 'NotFound') {
                $('#query').text(' Not Found Anything.');
            }
            else {
                $('#query').text(' Error!');
            }
        });
    }

    function needPause() {
        if(pause){
            alert('You cannot require so frequent.');
            return true;
        }
        pause = true;
        var timeout = setTimeout(function(){
            pause = false;
        }, 10000);
        return false;
    }
});
