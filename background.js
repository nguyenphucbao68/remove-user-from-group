//Context Menu
function kickmem(info){
  var link = JSON.parse(JSON.stringify(info));
  fetch("http://localhost/fbid/class.php?link=" + link.linkUrl).then(function(res){
    return res.json()
  }).then(function(ress){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {jack: 'KickMember', idUser: ress.fbid}, function(res) {
        if(res.kicked == 1){
          chrome.tabs.sendMessage(tabs[0].id, {jack: 'AlertKickSuccess'});
        }else{
          chrome.tabs.sendMessage(tabs[0].id, {jack: 'AlertKickFailure'});
        }
      })
    })
  });
}
var contexts = ["link"];
for (var i = 0; i < contexts.length; i++) {
  var title = "Kick Member này khỏi nhóm";
  var id = chrome.contextMenus.create({"title": title, "contexts":["link"],"onclick": kickmem});
}
