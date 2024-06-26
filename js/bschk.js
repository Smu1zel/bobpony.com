// Firefox 59 and Chrome 69 are the oldest that load the main page and the navbar correctly. Try flatMap and act accordingly.
// TODO: Handle Firefox 59-61
var baseUrl = window.location.origin;
try {
    var test = [1];
test.flatMap(function () {
});
} catch (err) {
   window.location.replace(baseUrl + "/fallback");
};