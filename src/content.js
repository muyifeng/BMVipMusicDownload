$(function() {
  // Handler for .ready() called.
  // console("test download baidu vip music start ====>");

  rate = "320";
  urlToGetRealLink = "http://ting.baidu.com/data/music/links";
  downloadIconUrl = chrome.extension.getURL("images/download_16.png");

  // Generate download buttons when mouse hover the links.
  // $(document).bind("mousemove", function(e){
  //   if ($(e.target).hasClass("song-item") || ($(e.target).is("li") && $(e.target).parent().hasClass("song-list"))){
  //     linkElement = $(e.target).find("a[href^='/song/']");

  //     if (linkElement.length > 0 && $(e.target).find(".for-who-cannot-afford-baidu-music-vip").length == 0) {
  //       songId = linkElement.prop("href").match(/\d+/)[0];
  //       url = urlToGetRealLink + "?songIds=" + songId + "&rate=" + rate;

  //       $.ajax({
  //         context: this,
  //         url: url,
  //         type: "GET",
  //         dataType: "json"
  //       }).done(function( data ){
  //         if (data.data != null && data.data != "" && data.data.songList != null && data.data.songList[0].rate == 320 ) {
  //           realSongLink = data.data.songList[0].songLink;
  //           songName = data.data.songList[0].songName;
  //           songFormat = data.data.songList[0].format;

  //           downloadIcon = $("<img>").prop({src: downloadIconUrl, width: 12, height: 12});
  //           newAddedDownloadLink = $("<a>").prop({target: "_blank", href: realSongLink, download: songName + "." + songFormat, "class": "for-who-cannot-afford-baidu-music-vip"});
  //           downloadIcon.appendTo(newAddedDownloadLink);
  //           $(linkElement).parent().css("position", "relative");
  //           newAddedDownloadLink.insertBefore($(linkElement));
  //         }
  //       });
  //     }

  //   }
  // });

  function generateDownloadButtons() {
    songElements = $("a[href^='/song/']").filter(function(){
      return this.href.match(/\/song\/\d+$/);
    });

    songElements.each(function( index ){
      songId = $(this).prop("href").match(/\d+/)[0];
      url = urlToGetRealLink + "?songIds=" + songId + "&rate=" + rate;
      // console.log("url to get real link: ", url+".json");
      $.ajax({
        context: this,
        url: url,
        type: "GET",
        dataType: "json"
      }).done(function( data ){
        // console.log("response data: ", data);
        if (data.data != null && data.data != "" && data.data.songList != null && $(this).parent().find(".for-who-cannot-afford-baidu-music-vip").length == 0) {
          realSongLink = data.data.songList[0].songLink;
          songName = data.data.songList[0].songName;
          songFormat = data.data.songList[0].format;

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

  // Click page action icon to generate download buttons.
  // chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  //   // If we've been asked to post grades...
  //   if (msg.action && (msg.action == "generateDownloadButtons")) {
  //     // ...confirm we got the message and...
  //     response();
  //     // ...do what we do best: post grades !
  //     generateDownloadButtons();
  //   }
  // });

  // Click the "Generate download buttons" in popup page to generate download buttons.
  chrome.extension.onRequest.addListener(function(request, sender, response) {
    if(request.msg == "generateDownloadButtons") {
      response("start to generate download buttons.");
      generateDownloadButtons();
    } else {
      response("requested message is incorrect.");
    }
  });

  // generate download buttons when page is loaded.
  // generateDownloadButtons();

});
