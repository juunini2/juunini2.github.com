var header = document.querySelector("header");
var side = document.querySelector("side");
var part = side.children;
var main = document.querySelector("main");
var defaultTitle = "Hadoop Guide";
function loadFile(selector, file) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        document.querySelector(selector).innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", file, true);
    xhttp.send();
}
loadFile("header", "/hadoop/header.html"); // header태그에 header파일을 불러옴
loadFile("side", "/hadoop/side.html"); // side 태그에 side 파일을 불러옴
function headerClick() {
    header.addEventListener("click", function (e) {
        if (e.target.tagName == "A") {
            e.preventDefault(); // a태그의 기본 기능을 작동시키지 않음
            var path = e.target.getAttribute("href"); // 클릭한 태그의 href값
            var text = e.target.innerText; // 클릭한 태그 내부의 텍스트
            var pageTitle = text + " - Step. " + text.substring(text.length - 1, text.length); // 페이지의 제목 선언
            var url = "#" + path.substring(path.length - 8, path.length - 5); // url에 나타날 경로
            loadFile("main", path); // main태그에 path경로의 파일을 불러옴
            document.title = defaultTitle + " " + pageTitle; // 페이지의 제목 설정
            history.pushState(path + " " + pageTitle, null, url); // 파일 경로 + 페이지 제목, null, url에 나타나는 경로 (히스토리에 추가)
            for (var i = 0; i < header.children.length; i++) {
                header.children[i].classList.remove("on");
            } // header태그 내 a태그들의 on클래스를 모두 삭제
            e.target.classList.add("on"); // 클릭한 a 태그에 on클래스 추가
            for (var i = 0; i < part.length; i++) {
                part[i].classList.remove("on"); // part 태그들의 on클래스를 제거
                for (var j = 0; j < part[i].children.length; j++) {
                    part[i].children[j].classList.remove("on"); // part 태그들의 자식 엘리먼트들의 on클래스를 모두 제거
                }
            }
            for (var i = 0; i < part.length; i++) {
                if (part[i].children[0].innerText == text) {
                    part[i].classList.add("on"); // 해당 part태그에 on클래스 추가
                    part[i].children[1].classList.add("on"); // part태그의 첫번 째 a태그에 on클래스 추가
                    break; // 반복 종료
                }
            }
        }
    });
}
headerClick(); // 실행
function sideClick() {
    side.addEventListener("click", function (e) {
        if (e.target.tagName == "A") {
            e.preventDefault(); // a태그의 기본 기능 작동 못하게 함
            var path = e.target.getAttribute("href"); // 불러올 파일 경로
            var text = e.target.parentElement.children[0].innerText; // part 제목
            var pageTitle = text + " - Step. " + text.substring(text.length - 1, text.length); // 페이지의 제목 선언
            var url = "#" + path.substring(path.length - 8, path.length - 5); // url에 나타날 경로
            loadFile("main", path); // main태그에 파일을 불러옴
            document.title = defaultTitle + " " + pageTitle; // 페이지 제목 설정
            history.pushState(path + " " + pageTitle, null, url); // 파일경로 + 페이지 제목, null, url경로 (히스토리에 추가)
            for (var i = 0; i < part.length; i++) {
                part[i].classList.remove("on");
                for (var j = 0; j < part[i].children.length; j++) {
                    part[i].children[j].classList.remove("on");
                }
            }
            for (var i = 0; i < header.children.length; i++) {
                header.children[i].classList.remove("on");
            }
            for (var i = 0; i < header.children.length; i++) {
                if (header.children[i].innerText == e.target.parentElement.children[0].innerText) {
                    header.children[i].classList.add("on"); // on클래스 추가
                    break; // 반복 종료
                }
            }
            e.target.parentElement.classList.add("on"); // 클릭한 part에 on클래스 추가
            e.target.classList.add("on"); // 클릭한 태그에 on클래스 추가
        }
        else if (e.target.tagName == "PART-TITLE") {
            e.target.parentElement.classList.toggle("on"); // 부모 태그에 on클래스를 토글
        }
    });
}
sideClick();
function PostState() {
    window.onpopstate = function (e) {
        if (e.state != null) {
            var path = e.state.substring(0, e.state.search(" ")); // 히스토리의 파일 경로
            var pageTitle = e.state.substring(e.state.search(" "), e.state.length); // 히스토리의 페이지 제목
            document.title = defaultTitle + " " + pageTitle; // 페이지 제목 설정
            loadFile("main", path); // main태그에 히스토리에 있는 파일을 불러옴
            for (var i = 0; i < part.length; i++) {
                part[i].classList.remove("on"); // 모든 part태그의 on클래스 제거
                for (var j = 0; j < part[i].children.length; j++) {
                    part[i].children[j].classList.remove("on"); // 모든 part태그의 자식 태그들의 on클래스 제거
                }
            }
            for (var i = 0; i < header.children.length; i++) {
                header.children[i].classList.remove("on"); // header태그의 모든 자식태그의 on클래스 제거
            }
            for (var i = 0; i < header.children.length; i++) {
                if (header.children[i].getAttribute("href") == path) {
                    header.children[i].classList.add("on"); // 조건이 맞으면 해당 태그에 on클래스 추가
                    part[i].classList.add("on"); // a태그의 순서와 같은 순서의 part태그에도 on클래스 추가
                    for (var j = 1; j <= part[i].children.length; i++) {
                        if (part[i].children[j].getAttribute("href") == path) {
                            part[i].children[j].classList.add("on"); // 조건이 맞으면 해당 태그에 on클래스 추가
                        }
                        break; // 반복 종료
                    }
                    break; // 반복 종료
                }
            }
        }
        else {
            for (var i = 0; i < document.querySelectorAll("a").length; i++) {
                document.querySelectorAll("a")[i].classList.remove("on");
            }
            for (var i = 0; i < part.length; i++) {
                part[i].classList.remove("on");
            }
            document.title = defaultTitle; // 페이지 제목을 기본 제목으로 설정
            main.innerHTML = ""; // main태그 내용 제거
            var start = document.createElement("start"); // start태그 생성
            main.appendChild(start); // main태그 자식으로 start태그 추가
            Word(); // 실행
        }
    };
}
PostState();
function loadPage() {
    var thisLocation = window.location.href; // 현재 url주소
    var location_ = thisLocation.substring(thisLocation.length - 3, thisLocation.length); // 현재 url주소에서 #뒤의 값
    var path = "/hadoop/page/" + location_ + ".html"; // 불러올 파일 경로
    if (thisLocation === "http://localhost:3000/#" + location_ || thisLocation === "https://juunini.github.io/hadoop/#" + location_) {
        var xhttp_1 = new XMLHttpRequest();
        xhttp_1.onreadystatechange = function () {
            document.querySelector("main").innerHTML = xhttp_1.responseText;
            for (var i = 0; i < header.children.length; i++) {
                if (header.children[i].getAttribute("href") == path.substring(0, path.length - 6) + "1.html") {
                    header.children[i].classList.add("on"); // 해당 태그에 on클래스 추가
                    part[i].classList.add("on"); // 해당 태그와 같은 순서의 part태그에도 on클래스 추가
                    for (var j = 0; j < part[i].children.length; j++) {
                        if (part[i].children[j].getAttribute("href") == path) {
                            part[i].children[j].classList.add("on"); // 해당 태그에 on클래스 추가
                            break;
                        }
                    }
                    break;
                }
            }
        };
        xhttp_1.open("GET", path, true);
        xhttp_1.send();
    }
}
loadPage();
