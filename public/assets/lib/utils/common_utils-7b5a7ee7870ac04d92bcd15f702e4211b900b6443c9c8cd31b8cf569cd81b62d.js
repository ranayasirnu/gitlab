(function(){!function(t){var e;return t.gl||(t.gl={}),(e=t.gl).utils||(e.utils={}),t.gl.utils.isInGroupsPage=function(){return"groups"===gl.utils.getPagePath()},t.gl.utils.isInProjectPage=function(){return"projects"===gl.utils.getPagePath()},t.gl.utils.getProjectSlug=function(){return this.isInProjectPage()?$("body").data("project"):null},t.gl.utils.getGroupSlug=function(){return this.isInGroupsPage()?$("body").data("group"):null},gl.utils.updateTooltipTitle=function(t,e){return t.tooltip("destroy").attr("title",e).tooltip("fixTitle")},gl.utils.preventDisabledButtons=function(){return $(".btn").click(function(t){return $(this).hasClass("disabled")?(t.preventDefault(),t.stopImmediatePropagation(),!1):void 0})},gl.utils.getPagePath=function(){return $("body").data("page").split(":")[0]},gl.utils.parseUrl=function(t){var e=document.createElement("a");return e.href=t,e},jQuery.timefor=function(t,e,i){var n,u;return t?(e||(e="remaining"),i||(i="Past due"),jQuery.timeago.settings.allowFuture=!0,n=jQuery.timeago.settings.strings.suffixFromNow,jQuery.timeago.settings.strings.suffixFromNow=e,u=$.timeago(t),u.indexOf("ago")>-1&&(u=i),jQuery.timeago.settings.strings.suffixFromNow=n,u):""}}(window)}).call(this);