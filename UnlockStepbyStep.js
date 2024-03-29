// ==UserScript==
// @name         Unlock Symbolab StepbyStep  
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       Joseph
// @match        https://www.symbolab.com/
// @include      *://*symbolab.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var code = `window.onload = function(){
        window.subscribed = true;
        if (typeof(SYSTEPS) != 'undefined') { SYSTEPS.subscribed = true }
        if (typeof(SOLUTIONS) != 'undefined') { SOLUTIONS.subscribed = true }
        if (typeof(SYMBOLAB) != 'undefined') { SYMBOLAB.params.subscribed = true }
        if (typeof(SYPRACTICE) != 'undefined') { SYPRACTICE.subscribed = true }
        isUserLoggedIn = function() { return true }

        if ($("#click-capture")) {
            $("#click-capture").addClass("click-capture-subscribed")
        }

    }`

    document.documentElement.setAttribute("onreset", code)
    document.documentElement.dispatchEvent(new CustomEvent("reset"))
    document.documentElement.removeAttribute("onreset")

})()
