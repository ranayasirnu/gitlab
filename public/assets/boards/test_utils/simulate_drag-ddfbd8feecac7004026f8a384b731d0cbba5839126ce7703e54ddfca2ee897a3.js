!function(){"use strict";function t(t,e,n){var o;if(t){var r=t.ownerDocument;return n=n||{},/^mouse/.test(e)?(o=r.createEvent("MouseEvents"),o.initMouseEvent(e,!0,!0,r.defaultView,n.button,n.screenX,n.screenY,n.clientX,n.clientY,n.ctrlKey,n.altKey,n.shiftKey,n.metaKey,n.button,t)):(o=r.createEvent("CustomEvent"),o.initCustomEvent(e,!0,!0,r.defaultView,n.button,n.screenX,n.screenY,n.clientX,n.clientY,n.ctrlKey,n.altKey,n.shiftKey,n.metaKey,n.button,t),o.dataTransfer={data:{},setData:function(t,e){this.data[t]=e},getData:function(t){return this.data[t]}}),t.dispatchEvent?t.dispatchEvent(o):t.fireEvent&&t.fireEvent("on"+e,o),o}}function e(t){var e="string"==typeof t.el?document.getElementById(t.el.substr(1)):t.el,n=e.children;return n[t.index]||n["first"===t.index?0:-1]||n["last"===t.index?n.length-1:-1]}function n(t){var e=t.getBoundingClientRect(),n=e.right-e.left,o=e.bottom-e.top;return{x:e.left,y:e.top,cx:e.left+n/2,cy:e.top+o/2,w:n,h:o,hw:n/2,wh:o/2}}function o(o,r){o.to.el=o.to.el||o.from.el;var i=e(o.from),a=e(o.to),c=o.scrollable,l=n(i),u=n(a),s=(new Date).getTime(),d=o.duration||1e3;t(i,"mousedown",{button:0}),o.ontap&&o.ontap(),window.SIMULATE_DRAG_ACTIVE=1;var f=setInterval(function(){var e=((new Date).getTime()-s)/d,n=l.cx+(u.cx-l.cx)*e-c.scrollLeft,r=l.cy+(u.cy-l.cy)*e-c.scrollTop,m=i.ownerDocument.elementFromPoint(n,r);t(m,"mousemove",{clientX:n,clientY:r}),e>=1&&(o.ondragend&&o.ondragend(),t(a,"mouseup"),clearInterval(f),window.SIMULATE_DRAG_ACTIVE=0)},100);return{target:i,fromList:i.parentNode,toList:a.parentNode}}window.simulateEvent=t,window.simulateDrag=o}();