define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,a=function(e){var t="[_:a-zA-Z\xc0-\uffff][-_:.a-zA-Z0-9\xc0-\uffff]*";this.$rules={start:[{token:"string.cdata.xml",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:["punctuation.xml-decl.xml","keyword.xml-decl.xml"],regex:"(<\\?)(xml)(?=[\\s])",next:"xml_decl",caseInsensitive:!0},{token:["punctuation.instruction.xml","keyword.instruction.xml"],regex:"(<\\?)("+t+")",next:"processing_instruction"},{token:"comment.xml",regex:"<\\!--",next:"comment"},{token:["xml-pe.doctype.xml","xml-pe.doctype.xml"],regex:"(<\\!)(DOCTYPE)(?=[\\s])",next:"doctype",caseInsensitive:!0},{include:"tag"},{token:"text.end-tag-open.xml",regex:"</"},{token:"text.tag-open.xml",regex:"<"},{include:"reference"},{defaultToken:"text.xml"}],xml_decl:[{token:"entity.other.attribute-name.decl-attribute-name.xml",regex:"(?:"+t+":)?"+t},{token:"keyword.operator.decl-attribute-equals.xml",regex:"="},{include:"whitespace"},{include:"string"},{token:"punctuation.xml-decl.xml",regex:"\\?>",next:"start"}],processing_instruction:[{token:"punctuation.instruction.xml",regex:"\\?>",next:"start"},{defaultToken:"instruction.xml"}],doctype:[{include:"whitespace"},{include:"string"},{token:"xml-pe.doctype.xml",regex:">",next:"start"},{token:"xml-pe.xml",regex:"[-_a-zA-Z0-9:]+"},{token:"punctuation.int-subset",regex:"\\[",push:"int_subset"}],int_subset:[{token:"text.xml",regex:"\\s+"},{token:"punctuation.int-subset.xml",regex:"]",next:"pop"},{token:["punctuation.markup-decl.xml","keyword.markup-decl.xml"],regex:"(<\\!)("+t+")",push:[{token:"text",regex:"\\s+"},{token:"punctuation.markup-decl.xml",regex:">",next:"pop"},{include:"string"}]}],cdata:[{token:"string.cdata.xml",regex:"\\]\\]>",next:"start"},{token:"text.xml",regex:"\\s+"},{token:"text.xml",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment.xml",regex:"-->",next:"start"},{defaultToken:"comment.xml"}],reference:[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],attr_reference:[{token:"constant.language.escape.reference.attribute-value.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],tag:[{token:["meta.tag.punctuation.tag-open.xml","meta.tag.punctuation.end-tag-open.xml","meta.tag.tag-name.xml"],regex:"(?:(<)|(</))((?:"+t+":)?"+t+")",next:[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:"start"}]}],tag_whitespace:[{token:"text.tag-whitespace.xml",regex:"\\s+"}],whitespace:[{token:"text.whitespace.xml",regex:"\\s+"}],string:[{token:"string.xml",regex:"'",push:[{token:"string.xml",regex:"'",next:"pop"},{defaultToken:"string.xml"}]},{token:"string.xml",regex:'"',push:[{token:"string.xml",regex:'"',next:"pop"},{defaultToken:"string.xml"}]}],attributes:[{token:"entity.other.attribute-name.xml",regex:"(?:"+t+":)?"+t},{token:"keyword.operator.attribute-equals.xml",regex:"="},{include:"tag_whitespace"},{include:"attribute_value"}],attribute_value:[{token:"string.attribute-value.xml",regex:"'",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"attr_reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"attr_reference"},{defaultToken:"string.attribute-value.xml"}]}]},this.constructor===a&&this.normalizeRules()};(function(){this.embedTagRules=function(e,t,n){this.$rules.tag.unshift({token:["meta.tag.punctuation.tag-open.xml","meta.tag."+n+".tag-name.xml"],regex:"(<)("+n+"(?=\\s|>|$))",next:[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:t+"start"}]}),this.$rules[n+"-end"]=[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:"start",onMatch:function(e,t,n){return n.splice(0),this.token}}],this.embedRules(e,t,[{token:["meta.tag.punctuation.end-tag-open.xml","meta.tag."+n+".tag-name.xml"],regex:"(</)("+n+"(?=\\s|>|$))",next:n+"-end"},{token:"string.cdata.xml",regex:"<\\!\\[CDATA\\["},{token:"string.cdata.xml",regex:"\\]\\]>"}])}}).call(o.prototype),r.inherits(a,o),t.XmlHighlightRules=a}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){"use strict";function r(e,t){return e.type.lastIndexOf(t+".xml")>-1}var o=e("../../lib/oop"),a=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,l=(e("../../lib/lang"),function(){this.add("string_dquotes","insertion",function(e,t,n,o,a){if('"'==a||"'"==a){var l=a,u=o.doc.getTextRange(n.getSelectionRange());if(""!==u&&"'"!==u&&'"'!=u&&n.getWrapBehavioursEnabled())return{text:l+u+l,selection:!1};var s=n.getCursorPosition(),g=o.doc.getLine(s.row),c=g.substring(s.column,s.column+1),m=new i(o,s.row,s.column),d=m.getCurrentToken();if(c==l&&(r(d,"attribute-value")||r(d,"string")))return{text:"",selection:[1,1]};if(d||(d=m.stepBackward()),!d)return;for(;r(d,"tag-whitespace")||r(d,"whitespace");)d=m.stepBackward();var x=!c||c.match(/\s/);if(r(d,"attribute-equals")&&(x||">"==c)||r(d,"decl-attribute-equals")&&(x||"?"==c))return{text:l+l,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var a=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==a||"'"==a)){var i=r.doc.getLine(o.start.row),l=i.substring(o.start.column+1,o.start.column+2);if(l==a)return o.end.column++,o}}),this.add("autoclosing","insertion",function(e,t,n,o,a){if(">"==a){var l=n.getCursorPosition(),u=new i(o,l.row,l.column),s=u.getCurrentToken()||u.stepBackward();if(!s||!(r(s,"tag-name")||r(s,"tag-whitespace")||r(s,"attribute-name")||r(s,"attribute-equals")||r(s,"attribute-value")))return;if(r(s,"reference.attribute-value"))return;if(r(s,"attribute-value")){var g=s.value.charAt(0);if('"'==g||"'"==g){var c=s.value.charAt(s.value.length-1),m=u.getCurrentTokenColumn()+s.value.length;if(m>l.column||m==l.column&&g!=c)return}}for(;!r(s,"tag-name");)s=u.stepBackward();var d=u.getCurrentTokenRow(),x=u.getCurrentTokenColumn();if(r(u.stepBackward(),"end-tag-open"))return;var h=s.value;if(d==l.row&&(h=h.substring(0,l.column-x)),this.voidElements.hasOwnProperty(h.toLowerCase()))return;return{text:"></"+h+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,r,o){if("\n"==o){var a=n.getCursorPosition(),l=r.getLine(a.row),u=new i(r,a.row,a.column),s=u.getCurrentToken();if(s&&-1!==s.type.indexOf("tag-close")){if("/>"==s.value)return;for(;s&&-1===s.type.indexOf("tag-name");)s=u.stepBackward();if(!s)return;var g=s.value,c=u.getCurrentTokenRow();if(s=u.stepBackward(),!s||-1!==s.type.indexOf("end-tag"))return;if(this.voidElements&&!this.voidElements[g]){var m=r.getTokenAt(a.row,a.column+1),l=r.getLine(c),d=this.$getIndent(l),x=d+r.getTabString();return m&&"</"===m.value?{text:"\n"+x+"\n"+d,selection:[1,x.length,1,x.length]}:{text:"\n"+x}}}}})});o.inherits(l,a),t.XmlBehaviour=l}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(e,t,n){"use strict";function r(e,t){return e.type.lastIndexOf(t+".xml")>-1}var o=e("../../lib/oop"),a=(e("../../lib/lang"),e("../../range").Range),i=e("./fold_mode").FoldMode,l=e("../../token_iterator").TokenIterator,u=t.FoldMode=function(e,t){i.call(this),this.voidElements=e||{},this.optionalEndTags=o.mixin({},this.voidElements),t&&o.mixin(this.optionalEndTags,t)};o.inherits(u,i);var s=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};(function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r?r.closing||!r.tagName&&r.selfClosing?"markbeginend"==t?"end":"":!r.tagName||r.selfClosing||this.voidElements.hasOwnProperty(r.tagName.toLowerCase())?"":this._findEndTagInLine(e,n,r.tagName,r.end.column)?"":"start":""},this._getFirstTagInLine=function(e,t){for(var n=e.getTokens(t),o=new s,a=0;a<n.length;a++){var i=n[a];if(r(i,"tag-open")){if(o.end.column=o.start.column+i.value.length,o.closing=r(i,"end-tag-open"),i=n[++a],!i)return null;for(o.tagName=i.value,o.end.column+=i.value.length,a++;a<n.length;a++)if(i=n[a],o.end.column+=i.value.length,r(i,"tag-close")){o.selfClosing="/>"==i.value;break}return o}if(r(i,"tag-close"))return o.selfClosing="/>"==i.value,o;o.start.column+=i.value.length}return null},this._findEndTagInLine=function(e,t,n,o){for(var a=e.getTokens(t),i=0,l=0;l<a.length;l++){var u=a[l];if(i+=u.value.length,!(o>i)&&r(u,"end-tag-open")&&(u=a[l+1],u&&u.value==n))return!0}return!1},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n=new s;do if(r(t,"tag-open"))n.closing=r(t,"end-tag-open"),n.start.row=e.getCurrentTokenRow(),n.start.column=e.getCurrentTokenColumn();else if(r(t,"tag-name"))n.tagName=t.value;else if(r(t,"tag-close"))return n.selfClosing="/>"==t.value,n.end.row=e.getCurrentTokenRow(),n.end.column=e.getCurrentTokenColumn()+t.value.length,e.stepForward(),n;while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n=new s;do{if(r(t,"tag-open"))return n.closing=r(t,"end-tag-open"),n.start.row=e.getCurrentTokenRow(),n.start.column=e.getCurrentTokenColumn(),e.stepBackward(),n;r(t,"tag-name")?n.tagName=t.value:r(t,"tag-close")&&(n.selfClosing="/>"==t.value,n.end.row=e.getCurrentTokenRow(),n.end.column=e.getCurrentTokenColumn()+t.value.length)}while(t=e.stepBackward());return null},this._pop=function(e,t){for(;e.length;){var n=e[e.length-1];if(t&&n.tagName!=t.tagName){if(this.optionalEndTags.hasOwnProperty(n.tagName)){e.pop();continue}return null}return e.pop()}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r)return null;var o,i=r.closing||r.selfClosing,u=[];if(i)for(var s=new l(e,n,r.end.column),g={row:n,column:r.start.column};o=this._readTagBackward(s);){if(o.selfClosing){if(u.length)continue;return o.start.column+=o.tagName.length+2,o.end.column-=2,a.fromPoints(o.start,o.end)}if(o.closing)u.push(o);else if(this._pop(u,o),0==u.length)return o.start.column+=o.tagName.length+2,o.start.row==o.end.row&&o.start.column<o.end.column&&(o.start.column=o.end.column),a.fromPoints(o.start,g)}else{var s=new l(e,n,r.start.column),c={row:n,column:r.start.column+r.tagName.length+2};for(r.start.row==r.end.row&&(c.column=r.end.column);o=this._readTagForward(s);){if(o.selfClosing){if(u.length)continue;return o.start.column+=o.tagName.length+2,o.end.column-=2,a.fromPoints(o.start,o.end)}if(o.closing){if(this._pop(u,o),0==u.length)return a.fromPoints(c,o.start)}else u.push(o)}}}}).call(u.prototype)}),define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml","ace/worker/worker_client"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("../lib/lang"),a=e("./text").Mode,i=e("./xml_highlight_rules").XmlHighlightRules,l=e("./behaviour/xml").XmlBehaviour,u=e("./folding/xml").FoldMode,s=e("../worker/worker_client").WorkerClient,g=function(){this.HighlightRules=i,this.$behaviour=new l,this.foldingRules=new u};r.inherits(g,a),function(){this.voidElements=o.arrayToMap([]),this.blockComment={start:"<!--",end:"-->"},this.createWorker=function(e){var t=new s(["ace"],"ace/mode/xml_worker","Worker");return t.attachToDocument(e.getDocument()),t.on("error",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t},this.$id="ace/mode/xml"}.call(g.prototype),t.Mode=g});