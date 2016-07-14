function newTab() {
    console.log("link clicked");
    chrome.tabs.create({ url: "http://deafinitelymag.com" }, function (t) { console.log(t.id); });

}

document.querySelector("#clickable").onclick = newTab;