class juuninisEditor {
    // 사이즈 리스트
    sizes: Array<string> = ["10px", "12px", "14px", "18px", "24px", "32px", "48px", "64px", "96px"];
    // 사이즈 블록
    Sizes(): string {
        let Sizes = "<sizes>";
        for (let i in this.sizes) {
            Sizes += `<button type="button" style="font-size: ${this.sizes[i]}">${this.sizes[i]}</button>`;
        }
        Sizes += "</sizes>";
        return Sizes;
    }

    // 컬러 리스트
    colors: Array<string> = [
        "#ffffff", "#000000", "#e7e6e6", "#44546a", "#5b9bd5", "#ed7d31", "#a5a5a5", "#ffc000", "#4472c4", "#70ad47",

        "#f2f2f2", "#7f7f7f", "#d0cece", "#d6dce4", "#deebf6", "#fbe5d5", "#ededed", "#fff2cc", "#d9e2f3", "#e2efd9",
        "#d8d8d8", "#595959", "#aeabab", "#adb9ca", "#bdd7ee", "#f7cbac", "#dbdbdb", "#fee599", "#b4c6e7", "#c5e0b3",
        "#bfbfbf", "#3f3f3f", "#757070", "#8496b0", "#9cc3e5", "#f4b183", "#c9c9c9", "#ffd965", "#8eaadb", "#a8d08d",
        "#a5a5a5", "#262626", "#3a3838", "#323f4f", "#2e75b5", "#c55a11", "#7b7b7b", "#bf9000", "#2f5496", "#538135",
        "#7f7f7f", "#0c0c0c", "#171616", "#222a35", "#1e4e79", "#833c0b", "#525252", "#7f6000", "#1f3864", "#375623",

        "#ffffff", "#000000", "#faf3e8", "#1f497d", "#5c83b4", "#c0504d", "#9dbb61", "#8066a0", "#4bacc6", "#f59d56",
        "#ececec", "#929292", "#ccc8c2", "#dfe5ed", "#eff2f7", "#f9eded", "#f7f9f1", "#f3f0f6", "#edf7f9", "#fefbf8",
        "#d8d8d8", "#7f7f7f", "#bbb6ae", "#c6d1de", "#d6dfec", "#efd3d2", "#e6edd7", "#dfdbe7", "#d1eaf0", "#fce6d4",
        "#bfbfbf", "#727272", "#a29d96", "#8ea3bd", "#adc0d9", "#dfa7a5", "#cddcaf", "#bfb2cf", "#a4d5e2", "#f9cdaa",
        "#a5a5a5", "#595959", "#7d7974", "#56769d", "#84a1c6", "#cf7b79", "#b5cb88", "#9f8cb7", "#77c0d4", "#f7b580",
        "#8c8c8c", "#3f3f3f", "#575551", "#17365d", "#456287", "#903c39", "#758c48", "#604c78", "#3b8194", "#7a4e2b",
        "#ba1419", "#ed1c24", "#ffc20e", "#fff200", "#a7da4e", "#22b14c", "#00b7ef", "#0072bc", "#2f3699", "#6f3198"
    ];
    // 컬러 블록
    Colors(): string {
        let Colors = "<colors>";
        Colors += `<tab>
            <button type="button" class="on">글자색</button>
            <button type="button">배경색</button>
        </tab><color-picker>`;
        for (let i in this.colors) {
            Colors += `<button type="button" style="background-color: ${this.colors[i]}"></button>`
        }
        Colors += "</color-picker></colors>";
        return Colors;
    }

    // 코드 리스트
    codes: Array<string> = ["bash", "CSS", "GO", "JAVA", "JavaScript", "JSON", "Kotlin", "Markdown", "PHP", "powershell", "Python", "R", "Scala", "SCSS", "SQL", "Swift", "TypeScript", "XML"];
    // 코드 블록
    Codes(): string {
        let Codes = "<codes>";
        for (let i in this.codes) {
            Codes += `<button type="button">${this.codes[i]}</button>`;
        }
        Codes += "</codes>";
        return Codes;
    }

    // 링크 블록
    link: string = `<anchor>
        <input type="text" placeholder="URL">
        <input type="text" placeholder="Text">
        <button type="button">Insert</button>
    </anchor>`;

    // 이미지 블록
    image: string = `<insert-image>
        <tab>
            <button type="button" class="on"><i class="fa fa-upload"></i></button>
            <button type="button"><i class="fa fa-link"></i></button>
        </tab>
        <upload class="on">
            <input type="file" id="ImageFile" name="ImageFile" accept="image/*">
            <label for="ImageFile">
                <i class="fa fa-upload"></i>
                <strong>파일을 드래그해서 넣어주세요.</strong>
                (또는 클릭해서 선택해주세요.)
            </label>
        </upload>
        <insert-link>
            <input type="text" placeholder="http://">
            <button type="button">Insert</button>
        </insert-link>
    </insert-image>`;

    // 기능 버튼
    functions: string = `<functions>
        <button type="button" id="Bold"><i class="fa fa-bold"></i></button>
        <button type="button" id="Italic"><i class="fa fa-italic"></i></button>
        <button type="button" id="Underline"><i class="fa fa-underline"></i></button>
        <button type="button" id="StrikeThrough"><i class="fa fa-strikethrough"></i></button>
        <button type="button" id="Size"><i class="fa fa-text-height"></i></button>
        <button type="button" id="Color"><i class="fa fa-font"></i></button>

        <button type="button" id="Left"><i class="fa fa-align-left"></i></button>
        <button type="button" id="Center"><i class="fa fa-align-center"></i></button>
        <button type="button" id="Right"><i class="fa fa-align-right"></i></button>
        <button type="button" id="Horizon"><i class="fa fa-minus"></i></button>

        <button type="button" id="CodeBlock"><i class="fa fa-code"></i></button>
        <button type="button" id="Link"><i class="fa fa-link"></i></button>
        <button type="button" id="Image"><i class="fa fa-image"></i></button>
    </functions>
    <description></description>
    ${this.Sizes()}
    ${this.Colors()}
    ${this.Codes()}
    ${this.link}
    ${this.image}`;

    // 편집영역
    editor: string = `<editor contenteditable="true"></editor>`;
    // 코드블록이 보이는 부분
    mirror: string = `<mirror></mirror>`;

    constructor() {
        let ID = (_id: string): HTMLElement => document.getElementById(_id);
        let TAG = (name) => document.getElementsByTagName(name)[0];
        TAG("juuninis-editor").innerHTML = `
            ${this.functions}
            ${this.editor}
            ${this.mirror}
        `;  // 버튼영역 + 편집영역 + 코드블록 뷰
        TAG("editor").focus();  // 로드되면 이쪽에 포커스를 맞춤

        // font-awesome, highlight.js 추가
        TAG("head").innerHTML += `<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/solid.css" integrity="sha384-Rw5qeepMFvJVEZdSo1nDQD5B6wX0m7c5Z/pLNvjkB14W6Yki1hKbSEQaX9ffUbWe" crossorigin="anonymous">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/fontawesome.css" integrity="sha384-GVa9GOgVQgOk+TNYXu7S/InPTfSDTtBalSgkgqQ7sCik56N9ztlkoTr2f/T44oKV" crossorigin="anonymous">`;

        // 기능 버튼에 마우스오버시 나타날 팝업 텍스트
        let Hover = (_id: string, text: string) => {
            let description = TAG("description");   // 팝업 태그
            ID(_id).onmouseover = () => {
                description.innerText = text;
                description.setAttribute("class", "on");    // on 클래스를 넣어서 나타나게 함
                description.style.top = ID(_id).offsetTop + 45 + "px";   // 약간 아래에 위치하도록
                description.style.left = ID(_id).offsetLeft - (description.clientWidth / 2) + (ID(_id).offsetWidth / 2) + "px"; // 버튼의 중앙에 위치할 수 있도록
            }
            ID(_id).onmouseleave = () => {   // 마우스가 나가면 사라짐
                description.setAttribute("class", "");
            }
        }
        Hover("Bold", "두껍게");
        Hover("Italic", "기울임");
        Hover("Underline", "밑줄");
        Hover("StrikeThrough", "지움");
        Hover("Size", "글자 크기");
        Hover("Color", "글자색 / 배경색");

        Hover("Left", "왼쪽정렬");
        Hover("Center", "중앙정렬");
        Hover("Right", "오른쪽정렬");
        Hover("Horizon", "수평선 추가");

        Hover("CodeBlock", "코드블록 추가");
        Hover("Link", "링크 추가");
        Hover("Image", "이미지 추가");

        // 싱크
        let Sync = () => {
            let mirror = TAG("mirror");
            let code = mirror.getElementsByTagName("code");
            mirror.innerHTML = TAG("editor").innerHTML;
            for (let i = 0; i < code.length; i++) {
                hljs.highlightBlock(code[i]);
            }
        }
        // 키보드를 뗄 때 마다 싱크
        TAG("editor").onkeyup = () => Sync();

        // 기능버튼 클릭 시 작동
        let ExecCommand = (_id: string, exec: string) => {
            ID(_id).onclick = () => { document.execCommand(exec); Sync(); }
        }
        ExecCommand("Bold", "bold");    // 두껍게 버튼 누르면 두껍게
        ExecCommand("Italic", "italic");    // 기울임 버튼 누르면 기울임
        ExecCommand("Underline", "underline");  // 밑줄 버튼 누르면 밑줄
        ExecCommand("StrikeThrough", "strikethrough");  // 지움 버튼 누르면 주욱 그음

        ExecCommand("Left", "justifyleft"); // 왼쪽 정렬 클릭시 왼쪽 정렬
        ExecCommand("Center", "justifycenter"); // 중앙 정렬 클릭시 중앙 정렬
        ExecCommand("Right", "justifyright");   // 우측 정렬 클릭시 우측 정렬
        
        // 클릭시 팝업이 나오면 팝업에 클래스를 추가하고 top, left값을 지정함
        let Position = (_id: string, tag: string) => {
            ID(_id).onclick = () => {
                if (TAG(tag).getAttribute("class") != "on") {   // 클릭시 팝업이 나타날 때
                    // 다른 팝업을 전부 제거
                    for (let i = 0; i < TAG("juuninis-editor").children.length; i++) {
                        TAG("juuninis-editor").children[i].setAttribute("class", "");
                    }
                    TAG(tag).setAttribute("class", "on");   // 해당 팝업이 나타나게 함
                    TAG(tag).style.top = ID(_id).offsetTop + 45 + "px"; // top 위치설정
                    TAG(tag).style.left = ID(_id).offsetLeft - (TAG(tag).offsetWidth / 2) + (ID(_id).offsetWidth / 2) + "px";  // left 위치 설정
                } else {    // 팝업이 이미 나타나있으면 제거
                    TAG(tag).setAttribute("class", "");
                }
            }
        }
        Position("Size", "sizes");  // 글자 크기 클릭 시 글자 크기 셀렉트 팝업
        Position("Color", "colors");    // 글자색/배경색 클릭 시 컬러픽커 팝업
        Position("CodeBlock", "codes"); // 코드블록 클릭 시 코드리스트 셀렉트 팝업
        Position("Link", "anchor");   // 링크버튼 클릭 시 링크추가 팝업
        Position("Image", "insert-image"); // 이미지버튼 클릭 시 이미지추가 팝업

        // 글자크기 세팅
        let SetSize = () => {
            for (let i = 0; i < TAG("sizes").children.length; i++) {
                TAG("sizes").children[i].onclick = () => {
                    document.execCommand("fontSize", false, "7");   // 글자 크기를 임시로 7로 설정
                    let fontElements = document.getElementsByTagName("font");
                    for (let j = 0; j < fontElements.length; ++j) {
                        if (fontElements[j].size == 7) {
                            fontElements[j].removeAttribute("size");    // 임시 사이즈 제거
                            fontElements[j].style.fontSize = TAG("sizes").children[i].style.fontSize;   // 선택 사이즈로 세팅
                            fontElements[j].style.lineHeight = (parseInt(TAG("sizes").children[i].style.fontSize) + 10) + "px"; // 행간 세팅
                        }
                    }
                    TAG("sizes").setAttribute("class", "");   // 글자 크기 셀렉트팝업 제거
                    Sync(); // 싱크
                }
            }
        }; SetSize();

        // 글자색/배경색 세팅
        let ChooseColorType = () => {
            TAG("colors").children[0].children[0].onclick = () => {
                TAG("colors").children[0].children[0].setAttribute("class", "on");
                TAG("colors").children[0].children[1].setAttribute("class", "");
            }
            TAG("colors").children[0].children[1].onclick = () => {
                TAG("colors").children[0].children[0].setAttribute("class", "");
                TAG("colors").children[0].children[1].setAttribute("class", "on");
            }
        }; ChooseColorType();
        let SetColor = () => {
            for (let i = 0; i < TAG("color-picker").children.length; i++) {
                TAG("color-picker").children[i].onclick = () => {
                    if (TAG("colors").children[0].children[0].getAttribute("class") == "on") {  // 글자색 선택시
                        document.execCommand("forecolor", false, TAG("color-picker").children[i].style.backgroundColor);
                    } else {    // 배경색 선택시
                        document.execCommand("backcolor", false, TAG("color-picker").children[i].style.backgroundColor);
                    }
                    TAG("colors").setAttribute("class", "");    // 컬러픽커 제거
                    Sync(); // 싱크
                }
            }
        }; SetColor();

        // 코드블록 추가
        let SetCodeBlock = () => {
            for (let i = 0; i < TAG("codes").children.length; i++) {
                TAG("codes").children[i].onclick = () => {
                    let sel = document.getSelection();
                    let range = sel.getRangeAt(0);
                    range.deleteContents(); // 블록선택 후 추가 시 블록 내의 내용 전체 제거
        
                    let pre = document.createElement("pre");   //  pre코드 추가
                    let codeName = TAG("codes").children[i].innerHTML.toLowerCase();    // 코드 셀렉터의 소문자 추출
                    pre.innerHTML = `<code class="hljs ${codeName}">&#10;</code>`;     // 코드 태그에 클래스를 추가
        
                    range.insertNode(pre); // 코드블록 추가
                    pre.insertAdjacentHTML("afterend", "<p>&nbsp;</p>");    // 코드블록 밑에 내용을 넣을 수 있도록 p태그 추가
                    sel.removeAllRanges();
                    sel.addRange(range);    // 포커스 이동
                    range.collapse(false);  // 블록이 잡혀있는데 collapse 해제
                    TAG("codes").setAttribute("class", ""); // 셀렉트박스 제거
                    Sync(); // 싱크
                }
            }
        }; SetCodeBlock();

        // 수평선 추가
        let SetHorizon = () => {
            ID("Horizon").onclick = () => {
                let sel = document.getSelection();
                let range = sel.getRangeAt(0);
                range.deleteContents(); // 영역 선택 후 추가시 영역 삭제 후 추가
                let hr = document.createElement("hr");
                range.insertNode(hr);
                sel.removeAllRanges();
                sel.addRange(range);    // 포커스 이동
                range.collapse(false);  // 추가하면서 collapse가 되는데 false값으로 만들어줌
                Sync(); // 싱크
            };
        }; SetHorizon();

        // 링크 추가
        let SetAnchor = () => {
            TAG("anchor").children[2].onclick = () => {
                TAG("editor").innerHTML += `<a href="${TAG("anchor").children[1].value}" target="_new">${TAG("anchor").children[0].value}</a>`;
                TAG("anchor").setAttribute("class", "");    // 링크 추가 블록 제거
                TAG("anchor").children[0].value = "";   // 초기화
                TAG("anchor").children[1].value = "";   // 초기화
                Sync(); // 싱크
            }
        }; SetAnchor();

        // 이미지 추가 타입 선택
        let SetImageType = () => {
            TAG("insert-image").children[0].children[0].onclick = () => {
                TAG("insert-image").children[0].children[0].setAttribute("class", "on");
                TAG("insert-image").children[0].children[1].setAttribute("class", "");
                TAG("upload").setAttribute("class", "on");
                TAG("insert-link").setAttribute("class", "");
            }
            TAG("insert-image").children[0].children[1].onclick = () => {
                TAG("insert-image").children[0].children[0].setAttribute("class", "");
                TAG("insert-image").children[0].children[1].setAttribute("class", "on");
                TAG("upload").setAttribute("class", "");
                TAG("insert-link").setAttribute("class", "on");
            }
        }; SetImageType();

        // 이미지 추가(링크로 추가시)
        let SetImage = () => {
            TAG("insert-link").children[1].onclick = () => {
                TAG("editor").innerHTML += `<img src="${TAG("insert-link").children[0].value}" alt="">`;
                TAG("insert-image").setAttribute("class", "");  // 이미지 추가 블록 제거
                TAG("insert-link").children[0].value = "";  // 초기화
                Sync(); // 싱크
            }
        }; SetImage();

        // 에디터 클릭 시 팝업 전부 제거
        let EditorClick = () => {
            TAG("editor").onclick = () => {
                for (let i = 0; i < TAG("juuninis-editor").children.length; i++) {
                    TAG("juuninis-editor").children[i].setAttribute("class", "");
                }
            }
        }; EditorClick();
    }

    ImageUpload(postUrl: string, volume, prefix: string) {
        let TAG = (name) => document.getElementsByTagName(name)[0];
        document.ondrop = (e) => { e.preventDefault(); }
        TAG("upload").children[1].ondragover = (e) => { e.preventDefault(); }
        TAG("upload").children[1].ondrop = (e) => {
            e.preventDefault();
            let File = e.dataTransfer.items[0].getAsFile(); // 드래그 한 파일 정보

            if ((File.size / 1024).toFixed(0) < volume) {
                let formdata = new FormData();
                formdata.append("file", File);  // file이라는 이름으로 파일 정보 전송
                formdata.append("name", File.name); // name이라는 이름으로 파일 이름 전송

                let xhttp = new XMLHttpRequest();
                xhttp.open("POST", postUrl, true);
                xhttp.send(formdata);

                TAG("insert-image").setAttribute("class", "");  // 이미지 추가 블록 제거

                setTimeout(() => {
                    TAG("editor").innerHTML += `<img src="${prefix}${File.name}" alt="">`;
                }, 100);    // 바로 추가하면 에러가 날 가능성이 있어서 0.1초 후 추가
            } else {
                alert(`${volume / 1024}MB보다 작은 용량의 파일을 업로드 해주세요.`);
            }

        }

        TAG("upload").children[0].onchange = () => {
            let File = TAG("upload").children[0].files[0];

            if ((File.size / 1024).toFixed(0) < volume) {
                let formdata = new FormData();
                formdata.append("file", File);  // file이라는 이름으로 파일 정보 전송
                formdata.append("name", File.name); // name이라는 이름으로 파일 이름 전송

                let xhttp = new XMLHttpRequest();
                xhttp.open("POST", postUrl, true);
                xhttp.send(formdata);

                TAG("insert-image").setAttribute("class", "");  // 이미지 추가 블록 제거

                setTimeout(() => {
                    TAG("editor").innerHTML += `<img src="${prefix}${File.name}" alt="">`;
                }, 100);    // 바로 추가하면 에러가 날 가능성이 있어서 0.1초 후 추가
            } else {
                alert(`${volume / 1024}MB보다 작은 용량의 파일을 업로드 해주세요.`);
            }
        }
    }
}