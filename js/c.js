"use strict";

$(document).ready(function () {

    let info = {

        timezone: (new Date()).getTimezoneOffset() / 60,

        referrer: document.referrer,

        browserName: navigator.appName,
        browserEngine: navigator.product,
        browserVersion1a: navigator.appVersion,
        browserVersion1b: navigator.userAgent,
        browserLanguage: navigator.language,
        browserOnline: navigator.onLine,
        browserPlatform: navigator.platform,
        javaEnabled: navigator.javaEnabled(),
        dataCookiesEnabled: navigator.cookieEnabled,

        sizeScreenW: screen.width,
        sizeScreenH: screen.height,
        sizeAvailW: screen.availWidth,
        sizeAvailH: screen.availHeight,
        scrColorDepth: screen.colorDepth,
        scrPixelDepth: screen.pixelDepth,

    };

    $.post("/ajax.php", {action: '_ui', info: info}, function (data) {

    });

});