// ==UserScript==
// @name              纯净百度+Google
// @name:en           Baidu+Google
// @namespace         http://mofiter.com/
// @version           0.1
// @description       去除百度热搜和上下栏,在百度首页和搜索结果页面的百度一下按钮后面添加 Google 按钮，方便直接进行 Google 搜索
// @description:en    add a google search button behind the baidu search button on the baidu's homepage and search result page,making it convenient to search in google
// @author            mofiter
// @create            2020-04-20
// @lastmodified      2020-04-20
// @match             http*://www.baidu.com/
// @match             http*://www.baidu.com/s?*
// @grant             none
// ==/UserScript==

(function() {
    'use strict';

    // 隐藏百度热搜和上下栏
    hideById("qrcode")
    hideById("bottom_layer")
    hideById("u1")
    hideById("s-hotsearch-wrapper")
    hideById("hotsearch-content-wrapper")
    hideById("s-top-left")

    if(document.getElementById("s_main")!=null){
           document.getElementById("s_main").innerHTML=''
    }

    function hideById(elementId){
       if(document.getElementById(elementId)!=null){
           document.getElementById(elementId).style.visibility='hidden'
       }
    }

    // 添加Google搜索
    document.getElementById("form").style.width = "1000px";
    document.getElementsByClassName("s_btn_wr")[0].style.width = "80px";

    var baiduBtn = document.getElementById("su"); // 百度搜索按钮
    var googleBtn = document.createElement('span'); // Google 搜索按钮
    baiduBtn.style = "width:80px; border-radius:0;";
    googleBtn.className = baiduBtn.parentNode.className; // 将 Google 搜索按钮和百度搜索按钮的 class 名称设置为相同
    googleBtn.style = "width:80px;margin:0px 0px 0px 2px;";

    var h = baiduBtn.offsetHeight;
    var getStyle = function(element, property) {
    return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
    };
    var color = getStyle(baiduBtn, "background-color");
    var baiduUrl = window.location.href;
    if (baiduUrl.indexOf("/s?")!= -1){
        googleBtn.innerHTML = "<input type='button' id='google' value='Google' class='btn' style='width:80px; height:"+h+"px; color:#fff; background:"+ color +";border:0;border-radius:0 10px 10px 0;'>";
    }else{
        googleBtn.innerHTML = "<input type='button' id='google' value='Google' class='btn' style='width:80px; height:"+h+"px;color:#fff; background:"+ color +";border:0;border-radius:0 10px 10px 0;'>";
    }

    googleBtn.addEventListener('click', function () {
        var input = document.getElementById("kw"); // 百度输入框
        var keyword = input.value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
        if (keyword != "") {
            return googleSearch(keyword);
        }
    })

    var form = document.getElementsByClassName("fm")[0];
    form.appendChild(googleBtn);

    function googleSearch(keyword){ // Google 搜索
        var link = "https://www.google.com/search?q=" + encodeURIComponent(keyword);
        // window.location.href = link; //当前窗口打开链接
        window.open(link); //新窗口打开链接
    }
})();