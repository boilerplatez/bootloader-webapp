/**
 * Created by lalittanwar on 01/06/16.
 */

define({
    module: "webapp.main",
    extend: "spamjs.view",
    using: ["jqrouter"]
}).as(function(MAIN, jqrouter) {

    //jqrouter needs to be started ONLY once in whole project, before any entry point
    jqrouter.start();

    return {
        router: jqrouter.map({
            "/sayhi": "sayHiCallbackFunction",
            "/saybye": "sayByeCallbackFunction"
        }),
        _init_: function() {
            this.router().defaultRoute("/sayhi");
        },
        sayHiCallbackFunction: function() {
            console.info("sayHiCallbackFunction");
            //this.$$ referes to DOM container of current app
            //this.path('file') returns absolute path of give file
            this.$$.loadTemplate(
                this.path("webapp.main.html"), {
                    greet: "Hi",
                    name: "Buddy",
                    message: "Welcome To Sample App."
                }
            );
        },
        sayByeCallbackFunction: function() {
            console.info("sayByeCallbackFunction");
            this.$$.loadTemplate(
                this.path("webapp.main.html"), {
                    greet: "Bye",
                    name: "Buddy",
                    message: "See yaa.."
                }
            );
        }
    };

});
