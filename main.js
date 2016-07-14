

var GREEN = [0, 255, 0, 230];
var RED = [255, 0, 0, 230];
var pingingServerTimer;
var WAIT_TIME = 5000;
var baseURL = 'http://localhost:3000/';
var timer = { start: Date.now(), end: Date.now() }; // setting up timer  (will create better one later)

// Extension Button Event
chrome.browserAction.onClicked.addListener(function (t) {
   
    // click to reset

    clearInterval(pingingServerTimer);

    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', baseURL + 'reset', true);

    xhr.onreadystatechange = function () {
  
        if (xhr.readyState === 4) {
            setup(); // start all over again to RESET
        }
    }

    xhr.send();

});


function setup() {
    toggleBadge('NO', RED);
    pingingServerTimer = setInterval(function () {
        checkForWork();
    }, WAIT_TIME);
}

// testing how Promise API works.
function pingServer(url) {

    console.log('pinging Server: ', Date.now());

    return new Promise(function (resolve) {
        
        var xhr = new XMLHttpRequest();
       
        xhr.open('GET', url, true);
        
        xhr.onreadystatechange = function () {
 
            if (xhr.readyState === 4) {
                resolve(JSON.parse(xhr.responseText));
            }
        }

        xhr.send();
    });
}

function openNewTab(url) {
    console.log("opening Tab: ", Date.now());
    chrome.tabs.create({ url: url }, function (t) { console.log(t.id); });
    console.log("tab opened: ", Date.now());

    // end the timer here
    timer.end = Date.now();
    console.log("Timer done: ", timer.end - timer.start);
}

function checkForWork() {

    pingServer(baseURL + "job").then(
        function (resp) {
            if (resp.job) {
                // start the timer here
                timer.start = Date.now();

                toggleBadge('YES', GREEN);
              
                // Opening Tab ASAP!
                openNewTab(resp.url);
            } else {
                toggleBadge('NO', RED);
            }     
           
        });

}

function toggleBadge(text, color) {
    chrome.browserAction.setBadgeBackgroundColor({ color: color });
    chrome.browserAction.setBadgeText({ text: text });
}



setup();
