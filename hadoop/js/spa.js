function spa() {
    var _this = this;
    var xhttp = new XMLHttpRequest;
    var header = document.querySelector("header");
    var side = document.querySelector("aside");
    xhttp.onreadystatechange = function () {
        if (_this.readyState == 4 && _this.status == 200) {
            header.innerHTML = _this.responseText;
        }
    };
    xhttp.open("GET", "header.html", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (_this.readyState == 4 && _this.status == 200) {
            side.innerHTML = _this.responseText;
        }
    };
    xhttp.open("GET", "side.html", true);
    xhttp.send();
}
spa();
