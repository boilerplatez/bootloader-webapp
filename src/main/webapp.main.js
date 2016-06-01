/**
 * Created by lalittanwar on 01/06/16.
 */

define({
    module: "webapp.main",
    extend: "spamjs.view",
    using: ["jqrouter"]
}).as(function(MAIN, jqrouter) {

    return {
        _init_: function() {
            //this.$$ referes to DOM container of current app
            //this.path('file') returns absolute path of give file
            this.$$.loadTemplate(
                this.path("webapp.main.html"), {
                    name: "Buddy"
                }
            );
        }
    };

});
