(function(){!function(i){var n,o,t;return n=function(i,n,o){var t;return t=new Notification(i,n),setTimeout(function(){return t.close()},8e3),o?t.onclick=o:void 0},t=function(){return"Notification"in window?Notification.requestPermission():void 0},o=function(i,o,t,e){var r;if(r={body:o,icon:t},"Notification"in window){if("granted"===Notification.permission)return n(i,r,e);if("denied"!==Notification.permission)return Notification.requestPermission(function(o){return"granted"===o?n(i,r,e):void 0})}else;},i.notify=o,i.notifyPermissions=t}(window)}).call(this);