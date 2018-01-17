function header() {
    var _this = this;
    var xhttp = new XMLHttpRequest;
    var header = document.querySelector("header");
    xhttp.onreadystatechange = function () {
        if (_this.readyState == 4 && _this.status == 200) {
            header.innerHTML = _this.responseText;
        }
    };
    xhttp.open("GET", "header.html", true);
    xhttp.send();
}
function side() {
    var _this = this;
    var xhttp = new XMLHttpRequest;
    var header = document.querySelector("aside");
    xhttp.onreadystatechange = function () {
        if (_this.readyState == 4 && _this.status == 200) {
            header.innerHTML = _this.responseText;
        }
    };
    xhttp.open("GET", "side.html", true);
    xhttp.send();
}
header();
side();
