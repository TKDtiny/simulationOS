$(document).ready(function(){
    /*测试用账号*/
    sessionStorage.setItem("user","666666");
    $(document).bind("contextmenu",function(){
        return false;
    });
    $.dateSet();
    setInterval(function(){
        $.dateSet();
    },2000);
})


$(".loginBox").mousedown(function(){
    $(this).fadeToggle();
    $(".mask").fadeToggle(300,function(){
        $("input:password").focus();
        $(".loginBtn").click(function(){
            var pwd = sessionStorage.getItem("user");
            if($("input:password").val() == pwd){
                $("body").fadeOut(500,function(){
                    window.location.href = "page/home.html";    
                });
            }else{
                $(".pwdBox").hide();
                $(".loginBad").show();
            }
        });
    });
});
$(".mask").click(function(){
    $("input:password").focus();   
});

$(window).keydown(function(e){
    if($(".mask").css("display") == "none"){
        $(".loginBox").mousedown();
    }else if(e.which == 13){
        if($(".pwdBox").css("display") != "none"){
            $(".loginBtn").click();    
        }else{
            $(".okBtn").click(function(){
                $(".pwdBox").show();
                $(".loginBad").hide();
            });
            $(".okBtn").click();
        }
    }
});



$.extend({
    dateSet:function(){
        var time = new Date(),
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
        $(".date").text(mouth+"月"+date+"日、"+day);
    }
});