function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.match(/.*music\.baidu\.com.*/) != null) {
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

// chrome.pageAction.onClicked.addListener(function(tab){
//   console.log("calling content script!");
//   chrome.tabs.sendMessage(tab.id, {action: "generateDownloadButtons"}, function(){
//     if (chrome.runtime.lastError) {
//       // The error indicates that the content script
//       // has not been injected yet. Inject it and...
//       chrome.tabs.executeScript(tab.id, {
//         file: "content.js"
//       }, function() {
//         if (!chrome.runtime.lastError) {
//           // ...if injected successfully, send the message anew
//           onPageActionClicked(tab);
//         }
//       });
//     } else {
//       // The content script called our response callback,
//       // confirming that it is there and got our message
//       console.log("Message got through !");
//     }
//   });
// });
