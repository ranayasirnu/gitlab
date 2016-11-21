define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,a=function(e){var t="[_:a-zA-Z\xc0-\uffff][-_:.a-zA-Z0-9\xc0-\uffff]*";this.$rules={start:[{token:"string.cdata.xml",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:["punctuation.xml-decl.xml","keyword.xml-decl.xml"],regex:"(<\\?)(xml)(?=[\\s])",next:"xml_decl",caseInsensitive:!0},{token:["punctuation.instruction.xml","keyword.instruction.xml"],regex:"(<\\?)("+t+")",next:"processing_instruction"},{token:"comment.xml",regex:"<\\!--",next:"comment"},{token:["xml-pe.doctype.xml","xml-pe.doctype.xml"],regex:"(<\\!)(DOCTYPE)(?=[\\s])",next:"doctype",caseInsensitive:!0},{include:"tag"},{token:"text.end-tag-open.xml",regex:"</"},{token:"text.tag-open.xml",regex:"<"},{include:"reference"},{defaultToken:"text.xml"}],xml_decl:[{token:"entity.other.attribute-name.decl-attribute-name.xml",regex:"(?:"+t+":)?"+t},{token:"keyword.operator.decl-attribute-equals.xml",regex:"="},{include:"whitespace"},{include:"string"},{token:"punctuation.xml-decl.xml",regex:"\\?>",next:"start"}],processing_instruction:[{token:"punctuation.instruction.xml",regex:"\\?>",next:"start"},{defaultToken:"instruction.xml"}],doctype:[{include:"whitespace"},{include:"string"},{token:"xml-pe.doctype.xml",regex:">",next:"start"},{token:"xml-pe.xml",regex:"[-_a-zA-Z0-9:]+"},{token:"punctuation.int-subset",regex:"\\[",push:"int_subset"}],int_subset:[{token:"text.xml",regex:"\\s+"},{token:"punctuation.int-subset.xml",regex:"]",next:"pop"},{token:["punctuation.markup-decl.xml","keyword.markup-decl.xml"],regex:"(<\\!)("+t+")",push:[{token:"text",regex:"\\s+"},{token:"punctuation.markup-decl.xml",regex:">",next:"pop"},{include:"string"}]}],cdata:[{token:"string.cdata.xml",regex:"\\]\\]>",next:"start"},{token:"text.xml",regex:"\\s+"},{token:"text.xml",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment.xml",regex:"-->",next:"start"},{defaultToken:"comment.xml"}],reference:[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],attr_reference:[{token:"constant.language.escape.reference.attribute-value.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],tag:[{token:["meta.tag.punctuation.tag-open.xml","meta.tag.punctuation.end-tag-open.xml","meta.tag.tag-name.xml"],regex:"(?:(<)|(</))((?:"+t+":)?"+t+")",next:[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:"start"}]}],tag_whitespace:[{token:"text.tag-whitespace.xml",regex:"\\s+"}],whitespace:[{token:"text.whitespace.xml",regex:"\\s+"}],string:[{token:"string.xml",regex:"'",push:[{token:"string.xml",regex:"'",next:"pop"},{defaultToken:"string.xml"}]},{token:"string.xml",regex:'"',push:[{token:"string.xml",regex:'"',next:"pop"},{defaultToken:"string.xml"}]}],attributes:[{token:"entity.other.attribute-name.xml",regex:"(?:"+t+":)?"+t},{token:"keyword.operator.attribute-equals.xml",regex:"="},{include:"tag_whitespace"},{include:"attribute_value"}],attribute_value:[{token:"string.attribute-value.xml",regex:"'",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"attr_reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"attr_reference"},{defaultToken:"string.attribute-value.xml"}]}]},this.constructor===a&&this.normalizeRules()};(function(){this.embedTagRules=function(e,t,n){this.$rules.tag.unshift({token:["meta.tag.punctuation.tag-open.xml","meta.tag."+n+".tag-name.xml"],regex:"(<)("+n+"(?=\\s|>|$))",next:[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:t+"start"}]}),this.$rules[n+"-end"]=[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:"start",onMatch:function(e,t,n){return n.splice(0),this.token}}],this.embedRules(e,t,[{token:["meta.tag.punctuation.end-tag-open.xml","meta.tag."+n+".tag-name.xml"],regex:"(</)("+n+"(?=\\s|>|$))",next:n+"-end"},{token:"string.cdata.xml",regex:"<\\!\\[CDATA\\["},{token:"string.cdata.xml",regex:"\\]\\]>"}])}}).call(o.prototype),r.inherits(a,o),t.XmlHighlightRules=a}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){"use strict";function r(e,t){return e.type.lastIndexOf(t+".xml")>-1}var o=e("../../lib/oop"),a=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,s=(e("../../lib/lang"),function(){this.add("string_dquotes","insertion",function(e,t,n,o,a){if('"'==a||"'"==a){var s=a,l=o.doc.getTextRange(n.getSelectionRange());if(""!==l&&"'"!==l&&'"'!=l&&n.getWrapBehavioursEnabled())return{text:s+l+s,selection:!1};var u=n.getCursorPosition(),g=o.doc.getLine(u.row),c=g.substring(u.column,u.column+1),d=new i(o,u.row,u.column),m=d.getCurrentToken();if(c==s&&(r(m,"attribute-value")||r(m,"string")))return{text:"",selection:[1,1]};if(m||(m=d.stepBackward()),!m)return;for(;r(m,"tag-whitespace")||r(m,"whitespace");)m=d.stepBackward();var x=!c||c.match(/\s/);if(r(m,"attribute-equals")&&(x||">"==c)||r(m,"decl-attribute-equals")&&(x||"?"==c))return{text:s+s,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var a=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==a||"'"==a)){var i=r.doc.getLine(o.start.row),s=i.substring(o.start.column+1,o.start.column+2);if(s==a)return o.end.column++,o}}),this.add("autoclosing","insertion",function(e,t,n,o,a){if(">"==a){var s=n.getCursorPosition(),l=new i(o,s.row,s.column),u=l.getCurrentToken()||l.stepBackward();if(!u||!(r(u,"tag-name")||r(u,"tag-whitespace")||r(u,"attribute-name")||r(u,"attribute-equals")||r(u,"attribute-value")))return;if(r(u,"reference.attribute-value"))return;if(r(u,"attribute-value")){var g=u.value.charAt(0);if('"'==g||"'"==g){var c=u.value.charAt(u.value.length-1),d=l.getCurrentTokenColumn()+u.value.length;if(d>s.column||d==s.column&&g!=c)return}}for(;!r(u,"tag-name");)u=l.stepBackward();var m=l.getCurrentTokenRow(),x=l.getCurrentTokenColumn();if(r(l.stepBackward(),"end-tag-open"))return;var h=u.value;if(m==s.row&&(h=h.substring(0,s.column-x)),this.voidElements.hasOwnProperty(h.toLowerCase()))return;return{text:"></"+h+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,r,o){if("\n"==o){var a=n.getCursorPosition(),s=r.getLine(a.row),l=new i(r,a.row,a.column),u=l.getCurrentToken();if(u&&-1!==u.type.indexOf("tag-close")){if("/>"==u.value)return;for(;u&&-1===u.type.indexOf("tag-name");)u=l.stepBackward();if(!u)return;var g=u.value,c=l.getCurrentTokenRow();if(u=l.stepBackward(),!u||-1!==u.type.indexOf("end-tag"))return;if(this.voidElements&&!this.voidElements[g]){var d=r.getTokenAt(a.row,a.column+1),s=r.getLine(c),m=this.$getIndent(s),x=m+r.getTabString();return d&&"</"===d.value?{text:"\n"+x+"\n"+m,selection:[1,x.length,1,x.length]}:{text:"\n"+x}}}}})});o.inherits(s,a),t.XmlBehaviour=s}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(e,t,n){"use strict";function r(e,t){return e.type.lastIndexOf(t+".xml")>-1}var o=e("../../lib/oop"),a=(e("../../lib/lang"),e("../../range").Range),i=e("./fold_mode").FoldMode,s=e("../../token_iterator").TokenIterator,l=t.FoldMode=function(e,t){i.call(this),this.voidElements=e||{},this.optionalEndTags=o.mixin({},this.voidElements),t&&o.mixin(this.optionalEndTags,t)};o.inherits(l,i);var u=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};(function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r?r.closing||!r.tagName&&r.selfClosing?"markbeginend"==t?"end":"":!r.tagName||r.selfClosing||this.voidElements.hasOwnProperty(r.tagName.toLowerCase())?"":this._findEndTagInLine(e,n,r.tagName,r.end.column)?"":"start":""},this._getFirstTagInLine=function(e,t){for(var n=e.getTokens(t),o=new u,a=0;a<n.length;a++){var i=n[a];if(r(i,"tag-open")){if(o.end.column=o.start.column+i.value.length,o.closing=r(i,"end-tag-open"),i=n[++a],!i)return null;for(o.tagName=i.value,o.end.column+=i.value.length,a++;a<n.length;a++)if(i=n[a],o.end.column+=i.value.length,r(i,"tag-close")){o.selfClosing="/>"==i.value;break}return o}if(r(i,"tag-close"))return o.selfClosing="/>"==i.value,o;o.start.column+=i.value.length}return null},this._findEndTagInLine=function(e,t,n,o){for(var a=e.getTokens(t),i=0,s=0;s<a.length;s++){var l=a[s];if(i+=l.value.length,!(o>i)&&r(l,"end-tag-open")&&(l=a[s+1],l&&l.value==n))return!0}return!1},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n=new u;do if(r(t,"tag-open"))n.closing=r(t,"end-tag-open"),n.start.row=e.getCurrentTokenRow(),n.start.column=e.getCurrentTokenColumn();else if(r(t,"tag-name"))n.tagName=t.value;else if(r(t,"tag-close"))return n.selfClosing="/>"==t.value,n.end.row=e.getCurrentTokenRow(),n.end.column=e.getCurrentTokenColumn()+t.value.length,e.stepForward(),n;while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n=new u;do{if(r(t,"tag-open"))return n.closing=r(t,"end-tag-open"),n.start.row=e.getCurrentTokenRow(),n.start.column=e.getCurrentTokenColumn(),e.stepBackward(),n;r(t,"tag-name")?n.tagName=t.value:r(t,"tag-close")&&(n.selfClosing="/>"==t.value,n.end.row=e.getCurrentTokenRow(),n.end.column=e.getCurrentTokenColumn()+t.value.length)}while(t=e.stepBackward());return null},this._pop=function(e,t){for(;e.length;){var n=e[e.length-1];if(t&&n.tagName!=t.tagName){if(this.optionalEndTags.hasOwnProperty(n.tagName)){e.pop();continue}return null}return e.pop()}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r)return null;var o,i=r.closing||r.selfClosing,l=[];if(i)for(var u=new s(e,n,r.end.column),g={row:n,column:r.start.column};o=this._readTagBackward(u);){if(o.selfClosing){if(l.length)continue;return o.start.column+=o.tagName.length+2,o.end.column-=2,a.fromPoints(o.start,o.end)}if(o.closing)l.push(o);else if(this._pop(l,o),0==l.length)return o.start.column+=o.tagName.length+2,o.start.row==o.end.row&&o.start.column<o.end.column&&(o.start.column=o.end.column),a.fromPoints(o.start,g)}else{var u=new s(e,n,r.start.column),c={row:n,column:r.start.column+r.tagName.length+2};for(r.start.row==r.end.row&&(c.column=r.end.column);o=this._readTagForward(u);){if(o.selfClosing){if(l.length)continue;return o.start.column+=o.tagName.length+2,o.end.column-=2,a.fromPoints(o.start,o.end)}if(o.closing){if(this._pop(l,o),0==l.length)return a.fromPoints(c,o.start)}else l.push(o)}}}}).call(l.prototype)}),define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml","ace/worker/worker_client"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("../lib/lang"),a=e("./text").Mode,i=e("./xml_highlight_rules").XmlHighlightRules,s=e("./behaviour/xml").XmlBehaviour,l=e("./folding/xml").FoldMode,u=e("../worker/worker_client").WorkerClient,g=function(){this.HighlightRules=i,this.$behaviour=new s,this.foldingRules=new l};r.inherits(g,a),function(){this.voidElements=o.arrayToMap([]),this.blockComment={start:"<!--",end:"-->"},this.createWorker=function(e){var t=new u(["ace"],"ace/mode/xml_worker","Worker");return t.attachToDocument(e.getDocument()),t.on("error",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t},this.$id="ace/mode/xml"}.call(g.prototype),t.Mode=g}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,a=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},a.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};r.inherits(a,o),a.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},a.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},a.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=a}),define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";function r(){var e=l.replace("\\d","\\d\\-"),t={onMatch:function(e,t,n){var r="/"==e.charAt(1)?2:1;return 1==r?(t!=this.nextState?n.unshift(this.next,this.nextState,0):n.unshift(this.next),n[2]++):2==r&&t==this.nextState&&(n[1]--,(!n[1]||n[1]<0)&&(n.shift(),n.shift())),[{type:"meta.tag.punctuation."+(1==r?"":"end-")+"tag-open.xml",value:e.slice(0,r)},{type:"meta.tag.tag-name.xml",value:e.substr(r)}]},regex:"</?"+e,next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(t);var n={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[n,t,{include:"reference"},{defaultToken:"string"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(e,t,n){return t==n[0]&&n.shift(),2==e.length&&(n[0]==this.nextState&&n[1]--,(!n[1]||n[1]<0)&&n.splice(0,2)),this.next=n[0]||"start",[{type:this.token,value:e}]},nextState:"jsx"},n,o("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:e},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},t],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function o(e){return[{token:"comment",regex:/\/\*/,next:[i.getTagRule(),{token:"comment",regex:"\\*\\/",next:e||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[i.getTagRule(),{token:"comment",regex:"$|^",next:e||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}var a=e("../lib/oop"),i=e("./doc_comment_highlight_rules").DocCommentHighlightRules,s=e("./text_highlight_rules").TextHighlightRules,l="[a-zA-Z\\$_\xa1-\uffff][a-zA-Z\\d\\$_\xa1-\uffff]*\\b",u=function(e){var t=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier"),n="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",a="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)";this.$rules={no_regex:[i.getStartRule("doc-start"),o("no_regex"),{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/[+-]?\d[\d_]*(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+l+")(\\.)(prototype)(\\.)("+l+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+l+")(\\.)("+l+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+l+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+l+")(\\.)("+l+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+l+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+l+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"(?:"+n+")\\b",next:"start"},{token:["support.constant"],regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/},{token:t,regex:l},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+l+")(\\.)("+l+")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:l},{regex:"",token:"empty",next:"no_regex"}],start:[i.getStartRule("doc-start"),o("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],function_arguments:[{token:"variable.parameter",regex:l},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:a},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:a},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},e&&e.noES6||(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(e,t,n){if(this.next="{"==e?this.nextState:"","{"==e&&n.length)n.unshift("start",t);else if("}"==e&&n.length&&(n.shift(),this.next=n.shift(),-1!=this.next.indexOf("string")||-1!=this.next.indexOf("jsx")))return"paren.quasi.end";return"{"==e?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:a},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]}),e&&e.noJSX||r.call(this)),this.embedRules(i,"doc-",[i.getEndRule("no_regex")]),this.normalizeRules()};a.inherits(u,s),t.JavaScriptHighlightRules=u}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var n=e.getLine(t),o=n.match(/^(\s*\})/);if(!o)return 0;var a=o[1].length,i=e.findMatchingBracket({row:t,column:a});if(!i||i.row==t)return 0;var s=this.$getIndent(e.getLine(i.row));e.replace(new r(t,0,t,a-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype),t.MatchingBraceOutdent=o}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){"use strict";var r,o=e("../../lib/oop"),a=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,s=e("../../lib/lang"),l=["text","paren.rparen","punctuation.operator"],u=["text","paren.rparen","punctuation.operator","comment"],g={},c=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,g.rangeCount!=e.multiSelect.rangeCount&&(g={rangeCount:e.multiSelect.rangeCount})),g[t]?r=g[t]:void(r=g[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},d=function(e,t,n,r){var o=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,o,e.end.column+(o?0:1)]}},m=function(){this.add("braces","insertion",function(e,t,n,o,a){var i=n.getCursorPosition(),l=o.doc.getLine(i.row);if("{"==a){c(n);var u=n.getSelectionRange(),g=o.doc.getTextRange(u);if(""!==g&&"{"!==g&&n.getWrapBehavioursEnabled())return d(u,g,"{","}");if(m.isSaneInsertion(n,o))return/[\]\}\)]/.test(l[i.column])||n.inMultiSelectMode?(m.recordAutoInsert(n,o,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(n,o,"{"),{text:"{",selection:[1,1]})}else if("}"==a){c(n);var x=l.substring(i.column,i.column+1);if("}"==x){var h=o.$findOpeningBracket("}",{column:i.column+1,row:i.row});if(null!==h&&m.isAutoInsertedClosing(i,l,a))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==a||"\r\n"==a){c(n);var p="";m.isMaybeInsertedClosing(i,l)&&(p=s.stringRepeat("}",r.maybeInsertedBrackets),m.clearMaybeInsertedClosing());var x=l.substring(i.column,i.column+1);if("}"===x){var f=o.findMatchingBracket({row:i.row,column:i.column+1},"}");if(!f)return null;var k=this.$getIndent(o.getLine(f.row))}else{if(!p)return void m.clearMaybeInsertedClosing();var k=this.$getIndent(l)}var v=k+o.getTabString();return{text:"\n"+v+"\n"+k+p,selection:[1,v.length,1,v.length]}}m.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,o,a){var i=o.doc.getTextRange(a);if(!a.isMultiLine()&&"{"==i){c(n);var s=o.doc.getLine(a.start.row),l=s.substring(a.end.column,a.end.column+1);if("}"==l)return a.end.column++,a;r.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){c(n);var a=n.getSelectionRange(),i=r.doc.getTextRange(a);if(""!==i&&n.getWrapBehavioursEnabled())return d(a,i,"(",")");if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){c(n);var s=n.getCursorPosition(),l=r.doc.getLine(s.row),u=l.substring(s.column,s.column+1);if(")"==u){var g=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==g&&m.isAutoInsertedClosing(s,l,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var a=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==a){c(n);var i=r.doc.getLine(o.start.row),s=i.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){c(n);var a=n.getSelectionRange(),i=r.doc.getTextRange(a);if(""!==i&&n.getWrapBehavioursEnabled())return d(a,i,"[","]");if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){c(n);var s=n.getCursorPosition(),l=r.doc.getLine(s.row),u=l.substring(s.column,s.column+1);if("]"==u){var g=r.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==g&&m.isAutoInsertedClosing(s,l,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var a=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==a){c(n);var i=r.doc.getLine(o.start.row),s=i.substring(o.start.column+1,o.start.column+2);if("]"==s)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){c(n);var a=o,i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return d(i,s,a,a);if(!s){var l=n.getCursorPosition(),u=r.doc.getLine(l.row),g=u.substring(l.column-1,l.column),m=u.substring(l.column,l.column+1),x=r.getTokenAt(l.row,l.column),h=r.getTokenAt(l.row,l.column+1);if("\\"==g&&x&&/escape/.test(x.type))return null;var p,f=x&&/string|escape/.test(x.type),k=!h||/string|escape/.test(h.type);if(m==a)p=f!==k;else{if(f&&!k)return null;if(f&&k)return null;var v=r.$mode.tokenRe;v.lastIndex=0;var b=v.test(g);v.lastIndex=0;var w=v.test(g);if(b||w)return null;if(m&&!/[\s;,.})\]\\]/.test(m))return null;p=!0}return{text:p?a+a:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var a=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==a||"'"==a)){c(n);var i=r.doc.getLine(o.start.row),s=i.substring(o.start.column+1,o.start.column+2);if(s==a)return o.end.column++,o}})};m.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new i(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",l)){var o=new i(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",l))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",u)},m.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},m.recordAutoInsert=function(e,t,n){var o=e.getCursorPosition(),a=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,a,r.autoInsertedLineEnd[0])||(r.autoInsertedBrackets=0),r.autoInsertedRow=o.row,r.autoInsertedLineEnd=n+a.substr(o.column),r.autoInsertedBrackets++},m.recordMaybeInsert=function(e,t,n){var o=e.getCursorPosition(),a=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,a)||(r.maybeInsertedBrackets=0),r.maybeInsertedRow=o.row,r.maybeInsertedLineStart=a.substr(0,o.column)+n,r.maybeInsertedLineEnd=a.substr(o.column),r.maybeInsertedBrackets++},m.isAutoInsertedClosing=function(e,t,n){return r.autoInsertedBrackets>0&&e.row===r.autoInsertedRow&&n===r.autoInsertedLineEnd[0]&&t.substr(e.column)===r.autoInsertedLineEnd},m.isMaybeInsertedClosing=function(e,t){return r.maybeInsertedBrackets>0&&e.row===r.maybeInsertedRow&&t.substr(e.column)===r.maybeInsertedLineEnd&&t.substr(0,e.column)==r.maybeInsertedLineStart},m.popAutoInsertedClosing=function(){r.autoInsertedLineEnd=r.autoInsertedLineEnd.substr(1),r.autoInsertedBrackets--},m.clearMaybeInsertedClosing=function(){r&&(r.maybeInsertedBrackets=0,r.maybeInsertedRow=-1)},o.inherits(m,a),t.CstyleBehaviour=m}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),o=e("../../range").Range,a=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),
this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(i,a),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var o=this._getFoldWidgetBase(e,t,n);return!o&&this.startRegionRe.test(r)?"start":o},this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var a=o.match(this.foldingStartMarker);if(a){var i=a.index;if(a[1])return this.openingBracketBlock(e,a[1],n,i);var s=e.getCommentFoldRange(n,i+a[0].length,1);return s&&!s.isMultiLine()&&(r?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t){var a=o.match(this.foldingStopMarker);if(a){var i=a.index+a[0].length;return a[1]?this.closingBracketBlock(e,a[1],n,i):e.getCommentFoldRange(n,i,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),a=t,i=n.length;t+=1;for(var s=t,l=e.getLength();++t<l;){n=e.getLine(t);var u=n.search(/\S/);if(-1!==u){if(r>u)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=a)break;if(g.isMultiLine())t=g.end.row;else if(r==u)break}s=t}}return new o(a,i,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,n){for(var r=t.search(/\s*$/),a=e.getLength(),i=n,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++n<a;){t=e.getLine(n);var u=s.exec(t);if(u&&(u[1]?l--:l++,!l))break}var g=n;return g>i?new o(i,r,g,t.length):void 0}}.call(i.prototype)}),define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text").Mode,a=e("./javascript_highlight_rules").JavaScriptHighlightRules,i=e("./matching_brace_outdent").MatchingBraceOutdent,s=(e("../range").Range,e("../worker/worker_client").WorkerClient),l=e("./behaviour/cstyle").CstyleBehaviour,u=e("./folding/cstyle").FoldMode,g=function(){this.HighlightRules=a,this.$outdent=new i,this.$behaviour=new l,this.foldingRules=new u};r.inherits(g,o),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),a=o.tokens,i=o.state;if(a.length&&"comment"==a[a.length-1].type)return r;if("start"==e||"no_regex"==e){var s=t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);s&&(r+=n)}else if("doc-start"==e){if("start"==i||"no_regex"==i)return"";var s=t.match(/^\s*(\/?)\*/);s&&(s[1]&&(r+=" "),r+="* ")}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new s(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return t.attachToDocument(e.getDocument()),t.on("annotate",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t},this.$id="ace/mode/javascript"}.call(g.prototype),t.Mode=g}),define("ace/mode/svg_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/javascript_highlight_rules","ace/mode/xml_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./javascript_highlight_rules").JavaScriptHighlightRules,a=e("./xml_highlight_rules").XmlHighlightRules,i=function(){a.call(this),this.embedTagRules(o,"js-","script"),this.normalizeRules()};r.inherits(i,a),t.SvgHighlightRules=i}),define("ace/mode/folding/mixed",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),o=e("./fold_mode").FoldMode,a=t.FoldMode=function(e,t){this.defaultMode=e,this.subModes=t};r.inherits(a,o),function(){this.$getMode=function(e){"string"!=typeof e&&(e=e[0]);for(var t in this.subModes)if(0===e.indexOf(t))return this.subModes[t];return null},this.$tryMode=function(e,t,n,r){var o=this.$getMode(e);return o?o.getFoldWidget(t,n,r):""},this.getFoldWidget=function(e,t,n){return this.$tryMode(e.getState(n-1),e,t,n)||this.$tryMode(e.getState(n),e,t,n)||this.defaultMode.getFoldWidget(e,t,n)},this.getFoldWidgetRange=function(e,t,n){var r=this.$getMode(e.getState(n-1));return r&&r.getFoldWidget(e,t,n)||(r=this.$getMode(e.getState(n))),r&&r.getFoldWidget(e,t,n)||(r=this.defaultMode),r.getFoldWidgetRange(e,t,n)}}.call(a.prototype)}),define("ace/mode/svg",["require","exports","module","ace/lib/oop","ace/mode/xml","ace/mode/javascript","ace/mode/svg_highlight_rules","ace/mode/folding/mixed","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./xml").Mode,a=e("./javascript").Mode,i=e("./svg_highlight_rules").SvgHighlightRules,s=e("./folding/mixed").FoldMode,l=e("./folding/xml").FoldMode,u=e("./folding/cstyle").FoldMode,g=function(){o.call(this),this.HighlightRules=i,this.createModeDelegates({"js-":a}),this.foldingRules=new s(new l,{"js-":new u})};r.inherits(g,o),function(){this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)},this.$id="ace/mode/svg"}.call(g.prototype),t.Mode=g});