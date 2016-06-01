/**
 * Created by lalittanwar on 01/06/16.
 */
define({
    name: "DataService",
    extend: "jsutils.server",
    modules: ["jQuery", "jsutils.file"]
}).as(function(DATASERVICE, jQuery, fileUtil) {

    return {
        apiServer: "/data",
        urlMap: {
            "getAllUsers": "/users",
            "userDetails": "/users/current",
            "bookDetails": "/books/{bookCode}"
        },
        getBookDetails: function(bookCode) {
            return this.get("bookDetails", {}, {
                bookCode: bookCode
            });
        },
        createBook: function(bookCode, details) {
            return this.post("bookDetails", details, {
                bookCode: bookCode
            });
        },
        updateBook: function(bookCode, details) {
            return this.put("bookDetails", details, {
                bookCode: bookCode
            });
        },
        deleteBook: function(bookCode) {
            return this.delete("bookDetails", {}, {
                bookCode: bookCode
            });
        }
    };
});
