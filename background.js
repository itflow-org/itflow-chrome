// Listener for when user clicks the extension icon
// Runs content.js
chrome.action.onClicked.addListener((tab) => {
  console.log("ITFlow: Extension clicked/activated.")
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  });
});

// Message listener
// Listens for a hostname from content.js, passes it to the ITFlow server defined by the user and then returns form data (if any)
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "itflow");
  port.onMessage.addListener(function(msg) {
    if (msg.url){
      console.log("ITFlow: Received credential request from content JS. Requesting: " + msg.url);
      fetch(msg.url, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          if (data['found'] == "TRUE"){
            console.log("ITFlow: Credentials found, passing back to content JS.");
            port.postMessage({user: data['username']});
            port.postMessage({pass: data['password']});
          }
          else if (data['message']){
            port.postMessage({message: data['message']});
          }
          else {
            console.log("ITFlow: No credentials found for that URL.");
          }
      })
    }  
  });
});

