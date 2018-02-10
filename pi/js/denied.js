function Denied() {
    const agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
        document.querySelector("welcome").innerHTML = "You Need Modern Browser.<br><a href='https://www.google.co.kr/chrome/'><img src='/pi/chrome.png' alt=''></a><a href='https://www.mozilla.org/ko/firefox/new/'><img src='/pi/firefox.png' alt=''></a><a href='http://www.opera.com/ko'><img src='/pi/opera.png' alt=''></a>"
    } else {
        document.querySelector("welcome").innerHTML = "Welcome!";
        document.querySelector("welcome").classList.on("done");
    }
}

setTimeout(Denied(), 3000);
