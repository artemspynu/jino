"use strict";

(function () {
    let widget_id = 'wRGrpewqxt';
    let d = document;
    let w = window;

    function l() {
        let s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//code.jivosite.com/script/widget/' + widget_id;
        let ss = document.getElementsByTagName('script')[0];
        ss.parentNode.insertBefore(s, ss);
    }

    if (d.readyState == 'complete') {
        l();
    } else {
        if (w.attachEvent) {
            w.attachEvent('onload', l);
        } else {
            w.addEventListener('load', l, false);
        }
    }
})();