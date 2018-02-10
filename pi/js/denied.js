setTimeout(function(){
    const agent = navigator.userAgent.toLowerCase();
    const welcome = document.querySelector("welcome");
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
        welcome.innerHTML = "You Need Modern Browser.<br><a href='https://www.google.co.kr/chrome/'><img src='/pi/chrome.png' alt=''></a><a href='https://www.mozilla.org/ko/firefox/new/'><img src='/pi/firefox.png' alt=''></a><a href='http://www.opera.com/ko'><img src='/pi/opera.png' alt=''></a>"
    } else {
        welcome.innerHTML = "Welcome!";
        welcome.classList.add("done");
        setTimeout(function(){
            welcome.style.display = "none";
        }, 2000)
    }
}, 3000);