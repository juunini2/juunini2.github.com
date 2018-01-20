function Denied() {
    const agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
        alert("Internet Exploler Access Denied!");
        window.location.replace("https://www.google.com/chrome/");
    }
}

Denied();