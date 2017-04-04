function KickMember(idgroup, idUser, fb_dtsg) {
  var Optional = {
    method: "POST",
    credentials: "include",
    body: 'fb_dtsg='+fb_dtsg+'&confirm=true&ban_user=1'
  }
  var check = fetch(
    "https://www.facebook.com/ajax/groups/members/remove.php?group_id=" + idgroup + "&uid=" + idUser + "&is_undo=0", Optional)
  .then(function(res){
    return res ? true : false
  });
  console.log(check);
  return check;
}

function AlertKickSuccess(){
  alert('Đã kick thành công');
}
function AlertKickFailure(){
  alert('Đã kick thất bại cmnr :)))');
}
var fb_dtsg = document.querySelector('[name="fb_dtsg"]').value;
var IDGr = '707436202770775';
chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
  if(req.jack == 'KickMember'){
    var checkKick = KickMember(IDGr, req.idUser, fb_dtsg);
    sendRes({kicked: checkKick ?1:0});
  }
  if(req.jack == 'AlertKickSuccess'){
    AlertKickSuccess();
  }
  if(req.jack == 'AlertKickFailure'){
    AlertKickFailure();
  }
  return true;
})
