// Saves options to chrome.storage
console.log("Loaded options");
function save_options() {
    var url = document.getElementById('url').value;
    chrome.storage.sync.set({
      itflowurl: url 
    }, 
    function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 800);
      });
}
document.getElementById('save').addEventListener('click', save_options);