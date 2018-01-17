function header() {
    let xhttp = new XMLHttpRequest;
    let header = document.querySelector("header")[0];
    xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            header.innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "header.html", true);
    xhttp.send();
}

function side() {
    let xhttp = new XMLHttpRequest;
    let header = document.querySelector("aside")[0];
    xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            header.innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "side.html", true);
    xhttp.send();
}

header();
side();