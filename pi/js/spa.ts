const side = document.querySelector("side");
const sideChildren = side.children;
const main = document.querySelector("main");
const defaultTitle = "PI GUIDE"

function loadFile(selector, file) {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        document.querySelector(selector).innerHTML = xhttp.responseText;
    }

    xhttp.open("GET", file, true);
    xhttp.send();
}

loadFile("side", "/pi/side.html");  // side 태그에 side 파일을 불러옴

function sideClick() {
    side.addEventListener("click", (e) => { // side태그 클릭 이벤트

        if (e.target.tagName == "A") {  // a태그 클릭시

            e.preventDefault(); // a태그의 기본 기능 작동 못하게 함

            let url = e.target.getAttribute("href");   // href 값
            let text = e.target.innerText;    // a 태그의 텍스트
            let pageTitle = defaultTitle + " - " + text;  // 페이지의 제목 선언
            let path = "/pi/page/" + url.substring(2, url.length) + ".html";  // 불러올 파일 경로

            loadFile("main", path); // main태그에 파일을 불러옴
            document.title = pageTitle;    // 페이지 제목 설정
            history.pushState(path + " " + pageTitle, null, url);    // 파일경로 + 페이지 제목, null, url경로 (히스토리에 추가)

            for (let i = 0; i < sideChildren.length; i++) {   // side 내에 모든 자식클래스의 on클래스 제거
                sideChildren[i].classList.remove("on");
                sideChildren[i].children[0].classList.remove("on");
            }

            e.target.parentElement.classList.add("on"); // 클릭한 태그에 on클래스 추가
            e.target.classList.add("on"); // 클릭한 태그에 on클래스 추가

        }
    });
} sideClick();

function PostState() {
    window.onpopstate = (e) => {    // 뒤로가기, 앞으로가기 클릭시

        if (e.state != null) {  // 첫번 째 페이지로 가지 않을 시

            let path = e.state.substring(0, e.state.search(" "));   // 히스토리의 파일 경로
            let pageTitle = e.state.substring(e.state.search(" ") + 1, e.state.length); // 히스토리의 페이지 제목

            document.title = pageTitle;    // 페이지 제목 설정
            loadFile("main", path); // main태그에 히스토리에 있는 파일을 불러옴

            for (let i = 0; i < sideChildren.length; i++) {
                sideChildren[i].classList.remove("on"); // 모든 side p태그의 on클래스 제거
                sideChildren[i].children[0].classList.remove("on"); // 모든 side a태그의 on클래스 제거
            }

            for (let i = 0 ; i < sideChildren.length ; i++) {
                if (location.hash == sideChildren[i].children[0].getAttribute("href")) {
                    sideChildren[i].classList.add("on");
                    sideChildren[i].children[0].classList.add("on");
                    break;
                }
            }

        } else {    //첫번 째 페이지로 이동시

            for (let i = 0; i < sideChildren.length; i++) {
                sideChildren[i].classList.remove("on"); // 모든 side a태그의 on클래스 제거
                sideChildren[i].children[0].classList.remove("on"); // 모든 side a태그의 on클래스 제거
            }

            document.title = defaultTitle;  // 페이지 제목을 기본 제목으로 설정
            main.innerHTML = '<h1>PI GPIO GUIDE<h1><br><img src="/pi/main.png" alt="" class="mainImg">';
        }
    }
} PostState();

function loadPage() {

    let url = location.hash;    // 현재 url주소
    let path = "/pi/page/" + url.substring(2, url.length) + ".html"; // 불러올 파일 경로

    if (url != "" && url.search("#/") != -1){
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
            document.querySelector("main").innerHTML = xhttp.responseText;

            for (let i = 0; i < sideChildren.length; i++) {
                if (sideChildren[i].children[0].getAttribute("herf") == url) {  // hash값과 a태그의 href값이 같을 때
                    sideChildren[i].classList.add("on");
                    sideChildren[i].children[0].classList.add("on");
                    break;
                }
            }
        }

        xhttp.open("GET", path, true);
        xhttp.send();
    }
} loadPage();