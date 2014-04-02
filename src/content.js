$(function() {
    validRate = ['128', '256', '320', 'flac'];
    urlToGetRealLink = "http://ting.baidu.com/data/music/links";
    downloadIconUrl = chrome.extension.getURL("images/download_16.png");

    function generateDownloadButtons(rate) {
        songElements = $("a[href^='/song/']").filter(function(){
            return $(this).prop('href').match(/\d+/);
        });

        songElements.each(function( index ){
            songId = $(this).prop('href').match(/\d+/)[0];
             
            url = rate == 'flac' ? urlToGetRealLink + "?songIds=" + songId + "&type=" + rate :
                                   urlToGetRealLink + "?songIds=" + songId + "&rate=" + rate;
            $.ajax({
                context: this,
                url: url,
                type: "GET",
                dataType: "json"
            }).done(function( data ) {
                if (data.data && data.data.songList.length && $(this).parent().find(".for-who-cannot-afford-baidu-music-vip").length == 0) {
                    realSongLink = data.data.songList[0].songLink;
                    songName = data.data.songList[0].songName;
                    songFormat = data.data.songList[0].format;
                    if(!realSongLink)
                        return;

                    downloadIcon = $("<img>").prop({src: downloadIconUrl, width: 12, height: 12});
                    newAddedDownloadLink = $("<a>").prop({target: "_blank", href: realSongLink, download: songName + "." + songFormat, "class": "for-who-cannot-afford-baidu-music-vip"});

                    if ($(this).parent().parent().is("div") && $(this).parent().parent().hasClass("song-item")) {
                        newAddedDownloadLink.css("style", "top: 1px;");
                        $(this).parent().css("position", "relative");
                    } else {
                        newAddedDownloadLink.css("style", "top: 5px;");
                    }
                    downloadIcon.appendTo(newAddedDownloadLink);

                    newAddedDownloadLink.insertBefore($(this));
                }
            });
        });
    }

    // Click the "Generate download buttons" in popup page to generate download buttons.
    chrome.extension.onMessage.addListener(function(request, sender, response) {
        if(request.msg == "generateDownloadButtons"
            && validRate.indexOf(request.rate) > -1) {
            response("start to generate download buttons.");
            generateDownloadButtons(request.rate);
        } else {
            response("requested message is incorrect.");
        }
    });

});
