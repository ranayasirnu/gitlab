(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};this.EditBlob=function(){function e(e,i){null==i&&(i=null),this.editModeLinkClickHandler=t(this.editModeLinkClickHandler,this),ace.config.set("modePath",e+"/ace"),ace.config.loadModule("ace/ext/searchbox"),this.editor=ace.edit("editor"),this.editor.focus(),i&&this.editor.getSession().setMode("ace/mode/"+i),$("form").submit(function(t){return function(){return $("#file-content").val(t.editor.getValue())}}(this)),this.initModePanesAndLinks(),this.initSoftWrap(),new gl.BlobLicenseSelectors({editor:this.editor}),new BlobGitignoreSelectors({editor:this.editor}),new gl.BlobCiYamlSelectors({editor:this.editor})}return e.prototype.initModePanesAndLinks=function(){return this.$editModePanes=$(".js-edit-mode-pane"),this.$editModeLinks=$(".js-edit-mode a"),this.$editModeLinks.click(this.editModeLinkClickHandler)},e.prototype.editModeLinkClickHandler=function(t){var e,i,o;return t.preventDefault(),e=$(t.target),o=e.attr("href"),i=this.$editModePanes.filter(o),this.$editModeLinks.parent().removeClass("active hover"),e.parent().addClass("active hover"),this.$editModePanes.hide(),i.fadeIn(200),"#preview"===o?(this.$toggleButton.hide(),$.post(e.data("preview-url"),{content:this.editor.getValue()},function(t){return i.empty().append(t),i.syntaxHighlight()})):(this.$toggleButton.show(),this.editor.focus())},e.prototype.initSoftWrap=function(){this.isSoftWrapped=!1,this.$toggleButton=$(".soft-wrap-toggle"),this.$toggleButton.on("click",this.toggleSoftWrap.bind(this))},e.prototype.toggleSoftWrap=function(t){this.isSoftWrapped=!this.isSoftWrapped,this.$toggleButton.toggleClass("soft-wrap-active",this.isSoftWrapped),this.editor.getSession().setUseWrapMode(this.isSoftWrapped)},e}()}).call(this),function(){$(function(){var t=$(".js-edit-blob-form").data("relative-url-root");t+=$(".js-edit-blob-form").data("assets-prefix");new EditBlob(t,$(".js-edit-blob-form").data("blob-language"));new NewCommitForm($(".js-edit-blob-form"))})}.call(this);