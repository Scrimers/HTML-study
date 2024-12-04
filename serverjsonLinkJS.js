let jsonData;

console.log("1");

setTimeout(() => {


$.ajaxSetup({ async: false });	// 전역으로 동기화 설정
$.getJSON('./json/'+studyType+'.json', function(data){
    //서버에서 실행 시 
    jsonData = data;
    console.log("1");
})
.fail(function() {
    //로컬에서 실행 시 (CORS에러 때문에 작성)
    console.log("2 : "+JSON.stringify(localJson));
    jsonData = localJson;
    console.log("3 : "+JSON.stringify(jsonData));
})
.always(function() {
    console.log("4 : "+JSON.stringify(jsonData));
    jsonData = JSON.parse(JSON.stringify(jsonData));
    console.log("5 : "+jsonData);
});
console.log("2");
$.ajaxSetup({ async: true });	// 전역으로 비동기화 설정



console.log("3");
var html = [];
$.each(jsonData, function(i, item){				
    if(item.title == undefined) {
        console.log("명시되지 않은 타입 존재");
        return true;	//continue
    }

    if(item.type == "groupStart") {
        html.push('<article class="subArticle">');
        html.push('	<h1 class="bg_white b_c_gray subTitle">');
        html.push(item.mainTitle);
        html.push('	</h1>');

        html.push('	<div class="bg_white b_c_gray subGroup">');		
        if(item.reStudy == "y") {
            html.push('		<h3 class="bg_white b_c_gray subTitle du">');
        }else {
            html.push('		<h3 class="bg_white b_c_gray subTitle">');
        }
        html.push(item.title);
        html.push('		</h3>');

        html.push('	<div class="subGrid">');
        html.push('		<div class="bg_white b_c_gray subTitle">설명</div>');
        html.push('		<div class="bg_white b_c_gray subText">');
        if(item.explain != undefined && item.explain != "") {
            html.push(item.explain);
        }
        else {
            html.push('-');
        }
        html.push('		</div>');
        html.push('	</div>');

        if(item.howUse != undefined && item.howUse != "") {
            html.push('	<div class="subHowUse">');
            html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
            html.push('		<div class="bg_white b_c_gray bg_white b_c_gray subTextHowUse">');
            html.push(item.howUse);
            html.push('		</div>');
            html.push('	</div>');
        }
    }
    else if(item.type == "groupIng" || item.type == "groupEnd") {
        html.push('	<div class="subGroupC">');		
        if(item.reStudy == "y") {
            html.push('		<h3 class="bg_white b_c_gray subTitle du">');
        }else {
            html.push('		<h3 class="bg_white b_c_gray subTitle">');
        }	
        html.push(item.title);
        html.push('		</h3>');

        html.push('	<div class="subGrid">');
        html.push('		<div class="bg_white b_c_gray subTitle">설명</div>');
        html.push('		<div class="bg_white b_c_gray subText">');
        if(item.explain != undefined && item.explain != "") {
            html.push(item.explain);
        }
        else {
            html.push('-');
        }
        html.push('		</div>');
        html.push('	</div>');

        if(item.howUse != undefined && item.howUse != "") {
            if(item.type == "groupIng") {
                html.push('	<div class="subHowUse">');
            }else {
                html.push('	<div>');
            }
            html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
            html.push('		<div class="bg_white b_c_gray bg_white b_c_gray subTextHowUse">');
            html.push(item.howUse);
            html.push('		</div>');
            html.push('	</div>');
        }

        if(item.type == "groupEnd") {
            html.push('	</div>');
            html.push('</article>');
            
            if((jsonData.length-1) != i) {
                html.push('<div class="bL_gray"></div>');
            }
        }
    }
    else {
        html.push('<article class="subArticle">');

        if(item.reStudy == "y") {
            html.push('	<h3 class="bg_white b_c_gray subTitle du">');
        }else {
            html.push('	<h3 class="bg_white b_c_gray subTitle">');
        }
        html.push(item.title);
        html.push('	</h3>');
        
        html.push('	<div class="subGrid">');
        html.push('		<div class="bg_white b_c_gray subTitle">설명</div>');
        html.push('		<div class="bg_white b_c_gray subText">');
        if(item.explain != undefined && item.explain != "") {
            html.push(item.explain);
        }
        else {
            html.push('-');
        }
        html.push('		</div>');
        html.push('	</div>');

        if(item.howUse != undefined && item.howUse != "") {
                html.push('	<div>');
                html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
                html.push('		<div class="bg_white b_c_gray bg_white b_c_gray subTextHowUse">');
            html.push(item.howUse);
            html.push('		</div>');
            html.push('	</div>');
        }

        html.push('</article>');

        if((jsonData.length-1) != i) {
            html.push('<div class="bL_gray"></div>');
        }
    }
});
$('#mainSection').html(html.join(''));
}, 100);