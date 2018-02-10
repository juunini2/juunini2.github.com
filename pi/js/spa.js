var side = document.querySelector("side");
var sideChildren = side.children;
var main = document.querySelector("main");
var defaultTitle = "PI GUIDE";
function loadFile(selector, file) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        document.querySelector(selector).innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", file, true);
    xhttp.send();
}
loadFile("side", "/pi/side.html"); // side 태그에 side 파일을 불러옴
function sideClick() {
    side.addEventListener("click", function (e) {
        if (e.target.tagName == "A") {
            e.preventDefault(); // a태그의 기본 기능 작동 못하게 함
            var url = e.target.getAttribute("href"); // href 값
            var text = e.target.innerText; // a 태그의 텍스트
            var pageTitle = defaultTitle + " - " + text; // 페이지의 제목 선언
            var path = "/pi/page/" + url.substring(2, url.length) + ".html"; // 불러올 파일 경로
            loadFile("main", path); // main태그에 파일을 불러옴
            document.title = pageTitle; // 페이지 제목 설정
            history.pushState(path + " " + pageTitle, null, url); // 파일경로 + 페이지 제목, null, url경로 (히스토리에 추가)
            for (var i = 0; i < sideChildren.length; i++) {
                sideChildren[i].children[0].classList.remove("on");
            }
            e.target.classList.add("on"); // 클릭한 태그에 on클래스 추가
        }
    });
}
sideClick();
function PostState() {
    window.onpopstate = function (e) {
        if (e.state != null) {
            var path = e.state.substring(0, e.state.search(" ")); // 히스토리의 파일 경로
            var pageTitle = e.state.substring(e.state.search(" ") + 1, e.state.length); // 히스토리의 페이지 제목
            document.title = pageTitle; // 페이지 제목 설정
            loadFile("main", path); // main태그에 히스토리에 있는 파일을 불러옴
            for (var i = 0; i < sideChildren.length; i++) {
                sideChildren[i].children[0].classList.remove("on"); // 모든 side a태그의 on클래스 제거
            }
            for (var i = 0; i < sideChildren.length; i++) {
                if (location.hash == sideChildren[i].children[0].getAttribute("href")) {
                    sideChildren[i].children[0].classList.add("on");
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < sideChildren.length; i++) {
                sideChildren[i].children[0].classList.remove("on"); // 모든 side a태그의 on클래스 제거
            }
            document.title = defaultTitle; // 페이지 제목을 기본 제목으로 설정
            main.innerHTML = '<h1>PI GPIO GUIDE<h1><br><img src="/pi/main.png" alt="" class="mainImg">';
        }
    };
}
PostState();
function loadPage() {
    var url = location.hash; // 현재 url주소
    var path = "/pi/page/" + url.substring(2, url.length) + ".html"; // 불러올 파일 경로
    if (url != "") {
        var xhttp_1 = new XMLHttpRequest();
        xhttp_1.onreadystatechange = function () {
            document.querySelector("main").innerHTML = xhttp_1.responseText;
            for (var i = 0; i < sideChildren.length; i++) {
                if (sideChildren[i].children[0].getAttribute("herf") == url) {
                    sideChildren[i].children[0].classList.add("on");
                    break;
                }
            }
        };
        xhttp_1.open("GET", path, true);
        xhttp_1.send();
    }
}
loadPage();
