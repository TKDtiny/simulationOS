$(document).ready(function(){
    /*测试用背景及应用图标*/
    localStorage.setItem("appList",JSON.stringify(appList));
    localStorage.setItem("bg","desktop.jpg");
    /*禁用右键事件*/
    $(document).bind("contextmenu",function(){
        return false;
    });
    $("body").fadeIn(500);
    $.dateSet();
    setInterval(function(){
        $.dateSet();
    },2000);
    $(".timeBox").hover(function(){
        $(".timeTitle").fadeIn(200);
    },function(){
        $(".timeTitle").fadeOut(200);
    });
    $.oneSetApp();
    $.setBg();
});

$(".desktop").mousedown(function(e){
    $(".rightMenu").hide();
    if(e.which == 3){
        if((e.pageX+212) < $(this).width() && (e.pageY+318) < $(this).height()){
            $(".rightMenu").css({"top":e.pageY+"px","left":e.pageX+"px"}).fadeIn();
        }else if(e.pageY < 318){
            $(".rightMenu").css({"top":e.pageY+"px","left":(e.pageX - 212)+"px"}).fadeIn(100);
        }else if(e.pageX < 212){
            $(".rightMenu").css({"top":(e.pageY - 313)+"px","left":e.pageX+"px"}).fadeIn();
        }else{
            $(".rightMenu").css({"top":(e.pageY - 313)+"px","left":(e.pageX - 212)+"px"}).fadeIn(100);
        }
    }
    $(".fileMax").off("mousedown").mousedown(function(e){
        e.stopPropagation();
        $.setApp("w128px","icon_128px");
        $(".rightMenu").hide();
    });
    $(".fileCenter").off("mousedown").mousedown(function(e){
        e.stopPropagation();
        $.setApp("w64px","icon_64px");
        $(".rightMenu").hide();
    });
    $(".fileMin").off("mousedown").mousedown(function(e){
        e.stopPropagation();
        $.setApp("w32px","icon_32px");
        $(".rightMenu").hide();
    });
    $(".bgBtn").off("mousedown").mousedown(function(e){
        e.stopPropagation();
        $(".bgFile").click();
        $(".rightMenu").hide();
    });
    $(".bgFile").off("click").click(function(e){
        e.stopPropagation();
        console.log("1");
    });
    $(".bgFile").off("change").change(function(e){
        e.stopPropagation();
        var fileUrl = $(this).val().slice($(this).val().lastIndexOf("\\")+1);
        localStorage.setItem("bg",fileUrl);
        $.setBg();
    });
    $(".newFile").off("mousedown").mousedown(function(e){
        e.stopPropagation();
        
    });
});


$.extend({
    dateSet:function(){
        var time = new Date(),
            year = time.getFullYear(),
            mouth = time.getMonth(),
            date = time.getDate(),
            day = time.getDay(),
            hours = time.getHours(),
            minutes = time.getMinutes();
        if(minutes < 10){
            minutes = "0"+minutes;
        }
        switch(day){
            case 0:day = "星期一";
                break;
            case 1:day = "星期二";
                break;
            case 2:day = "星期三";
                break;
            case 3:day = "星期四";
                break;
            case 4:day = "星期五";
                break;
            case 5:day = "星期六";
                break;
            case 6:day = "星期天";
                break;
        }
        $(".time").text(hours+":"+minutes);
        $(".date").text(year+"/"+mouth+"/"+date);
        $(".timeTitle").text(year+"年"+mouth+"月"+date+"日"+day);
    },
    oneSetApp:function(){
        var colHeight = $(".column").outerHeight();
        var appHeight = 104;
        var appIdx = Math.floor(colHeight/appHeight);
        var appInfo = JSON.parse(localStorage.getItem("appList")),
            app_len = appInfo.length;
        var count = 0;
        for(let i = 0;i < app_len;i++){
            if(i < appIdx){
                $(".column").eq(count).append("<div class='app w64px' title = '"+appInfo[i].appUrl+"'><img class='appIcon icon_64px' src='../img/icon_64px/"+appInfo[i].appIcon+"'/><span class='appName'>"+appInfo[i].appName+"</span></div>");
            }else{
                $(".desktop").append("<div class='column w64px'></div>");
                appIdx = appIdx*2;
                count++;
                $(".column").eq(count).append("<div class='app w64px' title = '"+appInfo[i].appUrl+"'><img class='appIcon icon_64px' src='../img/icon_64px/"+appInfo[i].appIcon+"'/><span class='appName'>"+appInfo[i].appName+"</span></div>");
            }
        }
    },
    setApp:function(width,iconWidth){
        if($(".column").hasClass("w64px")){
            $(".column").removeClass("w64px").addClass(width);
            $(".app").removeClass("w64px").addClass(width);
            $(".appIcon").removeClass("icon_64px").addClass(iconWidth);
        }else if($(".column").hasClass("w128px")){
            $(".column").removeClass("w128px").addClass(width);
            $(".app").removeClass("w128px").addClass(width);
            $(".appIcon").removeClass("icon_128px").addClass(iconWidth);
        }else if($(".column").hasClass("w32px")){
            $(".column").removeClass("w32px").addClass(width);
            $(".app").removeClass("w32px").addClass(width);
            $(".appIcon").removeClass("icon_32px").addClass(iconWidth);
        }
        var colHeight = $(".column").outerHeight(),
            appHeight = $(".app").outerHeight()+8,
            appIdx = Math.floor(colHeight/appHeight);
        var appInfo = JSON.parse(localStorage.getItem("appList")),
            app_len = appInfo.length;
        var count = 0;
        $(".app").remove();
        $(".column").remove();
        $(".desktop").append("<div class='column "+width+"'></div>")
        for(let i = 0; i < app_len;i++){
            if(i < appIdx){
                $(".column").eq(count).append("<div class='app "+width+"' title = '"+appInfo[i].appUrl+"'><img class='appIcon "+iconWidth+"' src='../img/"+iconWidth+"/"+appInfo[i].appIcon+"'/><span class='appName'>"+appInfo[i].appName+"</span></div>");
            }else{
                $(".desktop").append("<div class='column "+width+"'></div>");
                appIdx = appIdx+appIdx;
                count++;
                $(".column").eq(count).append("<div class='app "+width+"' title = '"+appInfo[i].appUrl+"'><img class='appIcon "+iconWidth+"' src='../img/"+iconWidth+"/"+appInfo[i].appIcon+"'/><span class='appName'>"+appInfo[i].appName+"</span></div>");
            }
        }
    },
    setBg:function(){
        var fileUrl = localStorage.getItem("bg");
        $(".desktop").css("background-image","url(../img/"+fileUrl+"");
    }
});


/*测试对象*/

var appList = [
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    },
    {
        appName:"糖果屋",
        appIcon:"img1.png",
        appUrl:"www.baidu.com"
    }
]


