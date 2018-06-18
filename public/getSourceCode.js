chrome.runtime.onMessage.addListener(function(request, sender) {
  console.log(request.source);
  window.testVar = request.source;
});

function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "sourceCodeHelper.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;