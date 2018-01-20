const header = document.querySelector("header");    // <header> 태그
const part = document.querySelector("side").children;    // <part> 태그

function clickNext() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        document.querySelector("main").innerHTML = xhttp.responseText;  // <main> 태그에 불러옴
    }

    xhttp.open("GET", "/hadoop/page/1_1.html", true); // 해당 경로의 파일을 <main> 태그에 불러옴
    xhttp.send();   // 실행

    header.children[0].classList.add("on"); // <header> 태그의 첫번 째 자식 엘리먼트에 on 클래스 추가
    part[0].classList.add("on"); // <part> 첫번 째 태그에 on 클래스 추가
    part[0].children[1].classList.add("on"); // <part> 첫번 째 태그의 두번 째 자식 엘리먼트(첫번 째 a태그)에 on 클래스 추가

    document.title = "Hadoop Guide Part. 1 - Step. 1";    // 페이지 제목
    history.pushState("/hadoop/page/1_1.html" + " " + "Part. 1 - Step. 1", null, "#1_1");   // 파일경로 + 페이지 제목, null, url상에 나타나는 경로 (히스토리에 남김)
}

function Word(){
    let word = "Hadoop Guide";
    let word_split = word.split("");    // Hadoop Guide 를 배열로 바꿈

    word_split.push("<br><br>");    // <br>태그 두개를 배열에 추가

    word = "참고서적: 시작하세요! 하둡 프로그래밍";
    word_split = word_split.concat(word.split("")); // 위의 문자를 쪼개서 배열에 추가

    word_split.push("<br>");     // <br>태그 한개를 배열에 추가

    word = "빅데이터 분석을 위한 하둡 기초부터 YARN까지";
    word_split = word_split.concat(word.split("")); // 위의 문자를 쪼개서 배열에 추가

    word_split.push("<br><br>");     // <br>태그 두개를 배열에 추가

    word = "(Beginning Hadoop: Learn from basic to practical techniques)";
    word_split = word_split.concat(word.split("")); // 위의 문자를 쪼개서 배열에 추가
    
    let hello = document.createElement("hello");    // hello 클래스 생성
    document.getElementsByTagName("start")[0].appendChild(hello);   // <start> 태그의 자식으로 <hello>클래스 배치

    let sum = ""
    for (let i = 0 ; i < word_split.length ; i++) {

        setTimeout(function(){
            sum += word_split[i];   // 배열의 글자를 하나씩 추가함
            hello.innerHTML = sum + "<cursor></cursor>";    // hello 클래스 내에 추가함
        }, ((i + 1) * 100));    // 0.1초에 글자가 하나씩 나타남

    }

    let hello2 = document.createElement("hello");   // 또 다른 hello 클래스 생성
    document.getElementsByTagName("start")[0].appendChild(hello2);  // <start> 태그의 자식으로 배치
    hello2.innerHTML = "<br><br><button class='button' onclick='clickNext();'>시작하기</button><br><br><img src='/hadoop/img/book.jpg' alt='' />";  // hello 태그 안에 추가
}

if (window.location.href === "http://localhost:3000/" || window.location.href === "https://juunini.github.io/hadoop/") {  //맨 첫페이지일 때
    let start = document.createElement("start");    // start 태그 생성
    document.querySelector("main").appendChild(start);  // <main>태그의 자식으로 start 태그 배치
    Word(); // 실행
}