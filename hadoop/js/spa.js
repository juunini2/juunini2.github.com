var Spa = /** @class */ (function () {
    function Spa() {
    }
    Spa.prototype.header = function () {
        var xhttp = new XMLHttpRequest;
        var header = document.querySelector("header")[0];
        xhttp.onreadystatechange = function () {
            header.innerHTML = xhttp.responseXML;
        };
        xhttp.open("GET", "./header.html", true);
        xhttp.send();
    };
    Spa.prototype.side = function () {
        var xhttp = new XMLHttpRequest;
        var header = document.querySelector("aside")[0];
        xhttp.onreadystatechange = function () {
            header.innerHTML = xhttp.responseXML;
        };
        xhttp.open("GET", "./side.html", true);
        xhttp.send();
    };
    return Spa;
}());
var spa = new Spa();
spa.header();
spa.side();
