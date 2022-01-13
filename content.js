// Detect username + password fields
// Borrowed from https://stackoverflow.com/a/687874
function getLoginFields() {
    console.log("ITFlow: Loaded getloginFields()")
    var fieldPairs = [],
        pswd = (function(){
            var inputs = document.getElementsByTagName('input'),
                len = inputs.length,
                ret = [];
            while (len--) {
                if (inputs[len].type === 'password') {
                    ret[ret.length] = inputs[len];
                }
            }
            return ret;
        })(),
        pswdLength = pswd.length,
        parentForm = function(elem) {
            while (elem.parentNode) {
                if(elem.parentNode.nodeName.toLowerCase() === 'form') {
                    return elem.parentNode;
                }
                elem = elem.parentNode;
            }
        };
    while (pswdLength--) {
        var curPswdField = pswd[pswdLength],
            parentForm = parentForm(curPswdField),
            curField = curPswdField;
        if (parentForm) {
            var inputs = parentForm.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i] !== curPswdField && inputs[i].type === 'text') {
                    fieldPairs[fieldPairs.length] = [inputs[i], curPswdField];
                    break;
                }
            }
        }
    }
    return fieldPairs;
}

// Call the above function & check if we've found login fields.
var loginFields = getLoginFields()[0];

if (loginFields) { 
    console.log ("ITFlow: Extension clicked/activated and login fields found.")

    // Get the login URL set in options & formulate the query URL
    chrome.storage.sync.get(['itflowurl'], function(result) {
        var query = window.location.hostname
        var url = result.itflowurl+query;

        console.log("ITFlow: Passing data to background service.. Query: " + query + " to  " + result.itflowurl + " as " + url);

        // Setup a connection to the background service
        // Send the current URL
        // If it returns back valid data, fill the user+pass fields
        var port = chrome.runtime.connect({name: "itflow"});
        port.postMessage({url: url});
        port.onMessage.addListener(function(msg) {
        if (msg.user){
            loginFields[0].value = msg.user;
            console.log("ITFlow: Filled username");
        }
        if (msg.pass){
            loginFields[1].value = msg.pass;
            console.log("ITFlow: Filled password");
        }
        if (msg.message){
            alert(msg.message);
            console.log("ITFlow: Received message from server. Message: " + msg.message);
        }  
        });
    });
}
else {
    console.log("ITFlow: No login fields found. Quitting.")
}
