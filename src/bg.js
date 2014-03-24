function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.match(/.*music\.baidu\.com.*/) != null) {
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
