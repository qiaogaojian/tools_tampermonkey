// ==UserScript==
// @name              专注模式
// @name:en           Focus Mode
// @version           1.0
// @description       去除网页上影响注意力的元素,保持专注
// @description:en    Remove distracting elements from your web pages and stay focused
// @author            Michael
// @match             *://*.baidu.com/*
// @match             *://*.sogou.com/*
// @match             *://*.zhihu.com/*
// @match             *://*.bilibili.com/*
// @include           *://*.baidu.com/*
// @include           *://*.sogou.com/*
// @include           *://*.zhihu.com/*
// @include           *://*.bilibili.com/*
// @include           *://*.youtube.com/*
// @grant             GM_addStyle
// @grant             GM_deleteValue
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_addValueChangeListener
// @connect           *
// @noframes
// @run-at       document-end
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// ==/UserScript==
// import $ from "libs/jquery.min";

setupFocusMode();

function setupFocusMode() {
    "use strict";
    let curUrl = window.location.href;
    console.log(`current website name: url: ${curUrl}`);

    switch (true) {
        case /.*baidu\.com.*/.test(curUrl):
            handleBaidu();
            break;
        case /.*zhihu\.com.*/.test(curUrl):
            handleZhihu();
            break;
        case /.*sogou\.com.*/.test(curUrl):
            handleSougou();
            break;
        case /.*bilibili\.com.*/.test(curUrl):
            handleBilibili();
            break;
        case /.*youtube\.com.*/.test(curUrl):
            handleYoutube();
            break;
    }
}

function handleBaidu() {
    console.log("********************************* baidu.com *********************************");

    // --------------------------------- 添加元素 ---------------------------------
    let baiduBtn = getSearchBtnBaidu();

    createSearchBtnGoogle(baiduBtn);
    createSearchBtnWeixin(baiduBtn);
    createSearchBtnBilibili(baiduBtn);
    createSearchBtnZhihu(baiduBtn);
    createSearchBtnDouban(baiduBtn);

    // --------------------------------- 隐藏元素 ---------------------------------
    hideEleBaidu();

    // --------------------------------- 调整样式 ---------------------------------
    ajustStyleBaidu();
}

function getSearchBtnBaidu() {
    // 百度搜索按钮
    let baiduBtn = $("#su")[0];
    baiduBtn.style = "width:80px; border-radius:0;";
    baiduBtn.addEventListener("click", function () {
        let keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
        let link = "https://www.baidu.com/s?wd=" + encodeURIComponent(keyword);
        // window.location.href = link; //当前窗口打开链接
        window.open(link, "_self"); //新窗口打开链接
    });
    return baiduBtn;
}

function createSearchBtnGoogle(baiduBtn) {
    let classNameBaidu = baiduBtn.parentNode.className;
    let heightBtnBaidu = baiduBtn.offsetHeight;
    let colorBtnBaidu = getStyle(baiduBtn, "background-color");

    // Google 搜索按钮
    let googleBtn = document.createElement("span");
    googleBtn.className = classNameBaidu; // 将 Google 搜索按钮和百度搜索按钮的 class 名称设置为相同
    googleBtn.style = "width:80px;margin:0px 0px 0px 2px;";
    googleBtn.addEventListener("click", function () {
        let keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
        let link = "https://www.google.com/search?q=" + encodeURIComponent(keyword);
        window.open(link);
    });
    googleBtn.innerHTML = "<input type='button' id='google' value='Google' class='btn' style='width:80px; height:" + heightBtnBaidu + "px; color:#fff; background:" + colorBtnBaidu + ";border:0;border-radius:0; font-size:17px;'>";

    // 输入后样式调整
    let input = document.getElementById("kw"); // 百度输入框
    input.addEventListener("input", function () {
        setTimeout(function () {
            let h = baiduBtn.offsetHeight;
            $("#google")[0].style.height = h + "px";
            console.log("reset google button height on input.");
        }, 10);
    });

    let form = $(".fm")[0];
    form.appendChild(googleBtn);
}

function createSearchBtnWeixin(baiduBtn) {
    let classNameBaidu = baiduBtn.parentNode.className;
    let heightBtnBaidu = baiduBtn.offsetHeight;
    let colorBtnBaidu = getStyle(baiduBtn, "background-color");

    // 微信搜索按钮
    let weixinBtn = document.createElement("span");
    weixinBtn.className = classNameBaidu; // 将微信搜索按钮和百度搜索按钮的 class 名称设置为相同
    weixinBtn.style = "width:80px;margin:0px 0px 0px 2px;";
    weixinBtn.addEventListener("click", function () {
        let keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
        let link = "https://weixin.sogou.com/weixin?type=2&query=" + encodeURIComponent(keyword);
        window.open(link);
    });
    weixinBtn.innerHTML = "<input type='button' id='weixin' value='微信' class='btn' style='width:80px; height:" + heightBtnBaidu + "px; color:#fff; background:" + colorBtnBaidu + ";border:0;border-radius:0; font-size:17px;'>";

    // 输入后样式调整
    let input = document.getElementById("kw"); // 百度输入框
    input.addEventListener("input", function () {
        setTimeout(function () {
            let h = baiduBtn.offsetHeight;
            $("#weixin")[0].style.height = h + "px";
        }, 10);
    });

    let form = $(".fm")[0];
    form.appendChild(weixinBtn);
}

function createSearchBtnBilibili(baiduBtn) {
    let classNameBaidu = baiduBtn.parentNode.className;
    let heightBtnBaidu = baiduBtn.offsetHeight;
    let colorBtnBaidu = getStyle(baiduBtn, "background-color");

    // B站搜索按钮
    let bilibiliBtn = document.createElement("span");
    bilibiliBtn.className = classNameBaidu; // 将B站搜索按钮和百度搜索按钮的 class 名称设置为相同
    bilibiliBtn.style = "width:80px;margin:0px 0px 0px 2px;";
    bilibiliBtn.addEventListener("click", function () {
        let keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
        let link = "https://search.bilibili.com/all?keyword=" + encodeURIComponent(keyword);
        window.open(link);
    });
    bilibiliBtn.innerHTML = "<input type='button' id='bilibili' value='B站' class='btn' style='width:80px; height:" + heightBtnBaidu + "px; color:#fff; background:" + colorBtnBaidu + ";border:0;border-radius:0; font-size:17px;'>";

    // 输入后样式调整
    let input = document.getElementById("kw"); // 百度输入框
    input.addEventListener("input", function () {
        setTimeout(function () {
            let h = baiduBtn.offsetHeight;
            $("#bilibili")[0].style.height = h + "px";
        }, 10);
    });

    let form = $(".fm")[0];
    form.appendChild(bilibiliBtn);
}

function createSearchBtnZhihu(baiduBtn) {
    let classNameBaidu = baiduBtn.parentNode.className;
    let heightBtnBaidu = baiduBtn.offsetHeight;
    let colorBtnBaidu = getStyle(baiduBtn, "background-color");

    // 知乎搜索按钮
    let zhihuBtn = document.createElement("span");
    zhihuBtn.className = classNameBaidu; // 将知乎搜索按钮和百度搜索按钮的 class 名称设置为相同
    zhihuBtn.style = "width:80px;margin:0px 0px 0px 2px;";
    zhihuBtn.addEventListener("click", function () {
        let keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
        let link = "https://www.zhihu.com/search?type=content&q=" + encodeURIComponent(keyword);
        window.open(link);
    });
    zhihuBtn.innerHTML = "<input type='button' id='zhihu' value='知乎' class='btn' style='width:80px; height:" + heightBtnBaidu + "px; color:#fff; background:" + colorBtnBaidu + ";border:0;border-radius:0; font-size:17px;'>";

    // 输入后样式调整
    let input = document.getElementById("kw"); // 百度输入框
    input.addEventListener("input", function () {
        setTimeout(function () {
            let h = baiduBtn.offsetHeight;
            $("#zhihu")[0].style.height = h + "px";
        }, 10);
    });

    let form = $(".fm")[0];
    form.appendChild(zhihuBtn);
}

function createSearchBtnDouban(baiduBtn) {
    let classNameBaidu = baiduBtn.parentNode.className;
    let heightBtnBaidu = baiduBtn.offsetHeight;
    let colorBtnBaidu = getStyle(baiduBtn, "background-color");

    // 豆瓣书籍搜索按钮
    let doubanBtn = document.createElement("span");
    doubanBtn.className = classNameBaidu; // 将豆瓣书籍搜索按钮和百度搜索按钮的 class 名称设置为相同
    doubanBtn.style = "width:80px;margin:0px 0px 0px 2px;";
    doubanBtn.addEventListener("click", function () {
        let keyword = $("#kw")[0].value.replace(/(^\s*)|(\s*$)/g, ""); // 搜索关键字（去空格）
        let link = "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent(keyword);
        window.open(link);
    });
    doubanBtn.innerHTML = "<input type='button' id='douban' value='豆瓣' class='btn' style='width:80px; height:" + heightBtnBaidu + "px; color:#fff; background:" + colorBtnBaidu + ";border:0;border-radius:0 10px 10px 0; font-size:17px;'>";

    // 输入后样式调整
    let input = document.getElementById("kw"); // 百度输入框
    input.addEventListener("input", function () {
        setTimeout(function () {
            let h = baiduBtn.offsetHeight;
            $("#douban")[0].style.height = h + "px";
        }, 10);
    });

    let form = $(".fm")[0];
    form.appendChild(doubanBtn);
}

function hideEleBaidu() {
    hideUnUsed();
    setTimeout(function () {
        hideUnUsed();
    }, 10);
}

function hideUnUsed() {
    $("#s_main").css("visibility", "hidden");
    $("#qrcode").css("visibility", "hidden");
    $("#bottom_layer").css("visibility", "hidden");
    $("#u1").css("visibility", "hidden");
    $("#s-hotsearch-wrapper").css("visibility", "hidden");
    $("#hotsearch-content-wrapper").css("visibility", "hidden");
    $("#s-top-left").css("visibility", "hidden");
    $("#content_right").css("visibility", "hidden");
    $("#s_lm_wrap").css("visibility", "hidden");
}

function ajustStyleBaidu() {
    // 输入框和搜索按钮父级
    $("#form")[0].style.width = "1200px";
    $(".s_btn_wr")[0].style.width = "80px";
}

function getStyle(element, property) {
    return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    })];
}

function handleZhihu() {
    console.log("********************************* zhihu.com *********************************");

    hideZhihu();
    setTimeout(function () {
        hideZhihu();
    }, 100);
}

function hideZhihu() {
    $(".SearchSideBar").css("visibility", "hidden");
    $(".Footer").css("visibility", "hidden");
    $(".PageHeader").css("visibility", "hidden");
    $(".css-1oy4rvw").css("visibility", "hidden");
    $("div[data-za-detail-view-path-module_name='相关推荐']").hide();
}

function handleSougou() {
    console.log("********************************* sogou.com *********************************");

    hideSougou();
    setTimeout(function () {
        hideSougou();
    }, 10);
}

function hideSougou() {
    $(".snb-right").css("visibility", "hidden");
}

function handleBilibili() {
    console.log("********************************* bilibili.com *********************************");

    hideBilibili();
    setTimeout(function () {
        hideBilibili();
    }, 10);

    let hideBilibiliTimer = setInterval(function () {
        if ($("#live_recommand_report").is("':hidden")) {
            clearInterval(hideBilibiliTimer);
            console.log("interval hide done!");
        } else {
            hideBilibili2();
        }
    }, 1000);
}

function hideBilibili() {
    $(".bili-feed4-layout").hide();
    $(".palette-button-outer").hide();
}

function hideBilibili2() {
    $(".palette-button-wrap").hide();
    $(".header-channel").hide();
    $(".rec-list").hide();

    $(".ad-report").hide();
    $(".rec-footer").hide();
    $("#live_recommand_report").hide();
    console.log("interval hide");
}

function handleYoutube() {
    console.log("********************************* handleYoutube *********************************");

    hideYoutube();
    setTimeout(function () {
        hideYoutube();
    }, 1000);
}

function hideYoutube() {
    $(".ytd-two-column-browse-results-renderer").css("visibility", "hidden");
    $(".ytd-watch-next-secondary-results-renderer").css("visibility", "hidden");
    $(".ytd-item-section-renderer").css("visibility", "hidden");
}