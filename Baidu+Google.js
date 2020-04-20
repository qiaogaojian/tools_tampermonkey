// ==UserScript==
// @name              百度+Google
// @name:en           Baidu+Google
// @namespace         http://mofiter.com/
// @version           0.1
// @description       在百度首页和搜索结果页面的百度一下按钮后面添加 Google 按钮，方便直接进行 Google 搜索
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
    document.getElementById("form").style.width = "1000px";
    document.getElementsByClassName("s_btn_wr")[0].style.width = "80px";
    var baiduBtn = document.getElementById("su"); // 百度搜索按钮
    baiduBtn.style = "width:80px";
    var googleBtn = document.createElement('span'); // Google 搜索按钮
    googleBtn.className = baiduBtn.parentNode.className; // 将 Google 搜索按钮和百度搜索按钮的 class 名称设置为相同
    googleBtn.style = "width:80px;margin:0px 0px 0px 2px;";

    var baiduUrl = window.location.href;
    // window.alert(baiduUrl);
    if (baiduUrl.indexOf("/s?")!= -1){
        googleBtn.innerHTML = "<input type='button' id='google' value='Google' class='btn' style='width:80px; height:34px; color:#fff; background:#38f;border:0;'>";
        // window.alert("finish");
    }else{
        googleBtn.innerHTML = "<input type='button' id='google' value='Google' class='btn' style='width:80px;'>";
        // window.alert("start");
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
    //baiduBtn.addEventListener('click',onClickBaidu);
    //function onClickBaidu()
    //{
    //    googleBtn.style.visibility = hidden;
    //    googleBtn.innerHTML = "<input type='button' id='google' value='Google' class='btn' style='width:80px; height:60px;'>";
    //}
})();