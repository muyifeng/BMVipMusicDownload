$(function() {
  $("button.generate-download-buttons").click(function(){
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendMessage(tab.id, {msg: "generateDownloadButtons"}, function(response) {
        console.log(response);
      });
    });
  });
});
