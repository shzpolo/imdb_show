$(document).ready(function () {
    var imdb_id = $('#imdbId').text();
    getInfo();
    function getInfo() {
        $.getJSON('crawler/poster', {name: imdb_id}, function(result) {
            if(result.stat == 'OK'){
                var src = !result.src? 'public/images/noPoster.png':result.src;
                $('#poster').attr({"src": src});
            }
            else{
            }
        });
        $.getJSON('dao/search', {name: 'imdb_id', keyword: imdb_id}, function (result) {
            if(result.stat == 'OK'){

                $('#imdbTitle').text(result.datas[0].title);
                $('#imdbType').text(result.datas[0].type);
                $('#imdbRate').text(result.datas[0].rate);
                $('#imdbLanguage').text(result.datas[0].language);
                $('#imdbRuntime').text(result.datas[0].runtime);
                $('#imdbYear').text(result.datas[0].year);
                $('#starAmount').text(result.datas[0].star);

            }
            else{
            }
        });
        $.getJSON('dao/casts', {imdb_id: imdb_id}, function(result) {
            if(result.stat == 'OK'){
                for(var i=0; i<result.datas.length; i++) {
                    var data = result.datas[i];
                    var td_order = (data.order) ? data.order : '???';
                    var td_name = (data.name) ? data.name : '!!!';
                    var tr_id = (data.cast_id) ? data.cast_id : 0;

                    var newRow = "<tr cast_id=\""  + tr_id +
                        "\"><td>" +
                        td_order + "</td><td>" +
                        td_name + "</td></tr>";
                    $('#castTable').append(newRow);
                }
            }
            else{
            }
        });
    }
});