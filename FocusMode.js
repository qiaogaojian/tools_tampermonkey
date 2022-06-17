// ==UserScript==
// @name              专注模式
// @name:en           Focus Mode
// @namespace         http://mofiter.com/
// @version           1.0
// @description       去除网页上影响注意力的元素,保持专注
// @description:en    Remove distracting elements from your web pages and stay focused
// @author            mofiter
// @match             *://*.baidu.com/*
// @match             *://*.sogou.com/*
// @match             *://*.zhihu.com/*
// @grant             none
// @require           https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function ()
{
    'use strict';

    let curUrl = window.location.href;
    console.log("current url: " + curUrl)

    // baidu.com:
    if (curUrl.includes("baidu.com"))
    {
        // ****************************************************************** 添加 ******************************************************************
   
        // 百度搜索按钮
        var baiduBtn = $("#su")[0]
        baiduBtn.style = "width:80px; border-radius:0;";
        baiduBtn.addEventListener('click', function ()
        {        
            var keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
            var link = "https://www.baidu.com/s?wd=" + encodeURIComponent(keyword);
            // window.location.href = link; //当前窗口打开链接
            window.open(link, '_self'); //新窗口打开链接
        })
        
        // Google 搜索按钮
        var googleBtn = document.createElement('span')
        googleBtn.className = baiduBtn.parentNode.className; // 将 Google 搜索按钮和百度搜索按钮的 class 名称设置为相同
        googleBtn.style = "width:80px;margin:0px 0px 0px 2px;";
        googleBtn.addEventListener('click', function ()
        {
            var keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
            var link = "https://www.google.com/search?q=" + encodeURIComponent(keyword);
            window.open(link);
        })

        // 微信搜索按钮
        var weixinBtn = document.createElement('span')
        weixinBtn.className = baiduBtn.parentNode.className; // 将微信搜索按钮和百度搜索按钮的 class 名称设置为相同
        weixinBtn.style = "width:80px;margin:0px 0px 0px 2px;";
        weixinBtn.addEventListener('click', function ()
        {
            var keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
            var link = "https://weixin.sogou.com/weixin?type=2&query=" + encodeURIComponent(keyword);
            window.open(link);
        })
        
        // B站搜索按钮
        var bilibiliBtn = document.createElement('span')
        bilibiliBtn.className = baiduBtn.parentNode.className; // 将B站搜索按钮和百度搜索按钮的 class 名称设置为相同
        bilibiliBtn.style = "width:80px;margin:0px 0px 0px 2px;";
        bilibiliBtn.addEventListener('click', function ()
        {
            var keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
            var link = "https://search.bilibili.com/all?keyword=" + encodeURIComponent(keyword);
            window.open(link);
        })
        
        // 知乎搜索按钮
        var zhihuBtn = document.createElement('span')
        zhihuBtn.className = baiduBtn.parentNode.className; // 将知乎搜索按钮和百度搜索按钮的 class 名称设置为相同
        zhihuBtn.style = "width:80px;margin:0px 0px 0px 2px;";
        zhihuBtn.addEventListener('click', function ()
        {
            var keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
            var link = "https://www.zhihu.com/search?type=content&q=" + encodeURIComponent(keyword);
            window.open(link);
        })

        // 添加元素
        var form = $(".fm")[0];
        form.appendChild(googleBtn);
        form.appendChild(weixinBtn);
        form.appendChild(bilibiliBtn);
        form.appendChild(zhihuBtn);
        
        
        // ****************************************************************** 隐藏 ******************************************************************

        hideUnUsed();
        setTimeout(function ()
        {
            hideUnUsed();
        }, 10);

        function hideUnUsed ()
        {
            $("#s_main").css("visibility", "hidden");
            $("#qrcode").css("visibility", "hidden");
            $("#bottom_layer").css("visibility", "hidden");
            $("#u1").css("visibility", "hidden");
            $("#s-hotsearch-wrapper").css("visibility", "hidden");
            $("#hotsearch-content-wrapper").css("visibility", "hidden");
            $("#s-top-left").css("visibility", "hidden");
            $("#content_right").css("visibility", "hidden");
        }


        // ****************************************************************** 调整 ******************************************************************

        // 输入框和搜索按钮父级
        $("#form")[0].style.width = "1200px";
        $(".s_btn_wr")[0].style.width = "80px";

        // 输入前后样式调整
        var h = baiduBtn.offsetHeight;
        var input = document.getElementById("kw"); // 百度输入框
        input.oninput = function ()
        {
            var btn1 = document.getElementById("google");
            var btn2 = document.getElementById("weixin");
            var btn3 = document.getElementById("bilibili");
            var btn4 = document.getElementById("zhihu");

            setTimeout(function ()
            {
                var h = baiduBtn.offsetHeight;

                btn1.style.height = h + "px";
                btn2.style.height = h + "px";
                btn3.style.height = h + "px";
                btn4.style.height = h + "px";
            }, 10);
        }

        // 样式统一调整
        var color = getStyle(baiduBtn, "background-color");
        googleBtn.innerHTML = "<input type='button' id='google' value='Google' class='btn' style='width:80px; height:" + h + "px; color:#fff; background:" + color + ";border:0;border-radius:0; font-size:17px;'>";
        weixinBtn.innerHTML = "<input type='button' id='weixin' value='微信' class='btn' style='width:80px; height:" + h + "px; color:#fff; background:" + color + ";border:0;border-radius:0; font-size:17px;'>";
        bilibiliBtn.innerHTML = "<input type='button' id='bilibili' value='B站' class='btn' style='width:80px; height:" + h + "px; color:#fff; background:" + color + ";border:0;border-radius:0; font-size:17px;'>";
        zhihuBtn.innerHTML = "<input type='button' id='zhihu' value='知乎' class='btn' style='width:80px; height:" + h + "px; color:#fff; background:" + color + ";border:0;border-radius:0 10px 10px 0; font-size:17px;'>";

        function getStyle (element, property)
        {
            return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
        }

        console.log("****************************************************************** baidu.com ******************************************************************")
    } else if (curUrl.includes("zhihu.com"))
    {
        hideUnUsed();
        setTimeout(function ()
        {
            hideUnUsed();
        }, 100);

        function hideUnUsed ()
        {
            $(".SearchSideBar").css("visibility", "hidden");
            $(".Footer").css("visibility", "hidden");
            $(".PageHeader").css("visibility", "hidden");
            $("div[data-za-detail-view-path-module_name='相关推荐']").hide();
        }

        console.log("****************************************************************** zhihu.com ******************************************************************")
    } else if (curUrl.includes("sogou.com"))
    {
        hideUnUsed();
        setTimeout(function ()
        {
            hideUnUsed();
        }, 10);

        function hideUnUsed ()
        {
            $(".snb-right").css("visibility", "hidden");
        }

        console.log("****************************************************************** sogou.com ******************************************************************")
    }
})();