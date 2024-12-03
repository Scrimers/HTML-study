var now = new Date();
var year = now.getFullYear();//연도
var month = (now.getMonth()+1).toString();//월
var date = now.getDate();//일
var day = now.getDay();//요일
var hr = now.getHours();//시간
var min = now.getMinutes();//분
var sec = now.getSeconds();//초
var nowDate = year+month+date+hr+min+sec;

let stylePClinkURL = "style.css?v="+nowDate;
let styleMobilelinkURL = "mobileStyle.css?v="+nowDate;

let linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = stylePClinkURL;
document.head.appendChild(linkElement);

linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = styleMobilelinkURL;
document.head.appendChild(linkElement);