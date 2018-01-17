function header() {
    let xhttp = new XMLHttpRequest;
    let header = document.querySelector("header");
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
    let header = document.querySelector("aside");
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