function spa() {
    let xhttp = new XMLHttpRequest;
    let header = document.querySelector("header");
    let side = document.querySelector("aside");

    xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            header.innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "header.html", true);
    xhttp.send();

    xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            side.innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "side.html", true);
    xhttp.send();
}

spa();