$(function() {
    $("button.generate-download-buttons").click(function(){
        chrome.tabs.getSelected(null, function(tab) {
            console.log($("input[type='radio']:checked").val());
            chrome.tabs.sendMessage(tab.id, {
                msg: "generateDownloadButtons",
                rate: $("input[type='radio']:checked").val()
            }, function(response) {
                console.log(response);
            });
        });
    });
});
