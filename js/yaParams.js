"use strict";

if (!window.yaParams) window.yaParams = {};
yaParams.devicePixelRatio = window.devicePixelRatio ? devicePixelRatio.toString() : 'undefined';

(function (d, w, c) {
    (w[c] = w[c] || []).push(function () {
        try {
            w.yaCounter29405755 = new Ya.Metrika({
                id: 29405755,
                accurateTrackBounce: true,
                triggerEvent: true,
                params: window.yaParams || {}
            });
            w.yaCounter23616394 = new Ya.Metrika({
                id: 23616394,
                trackLinks: true,
                accurateTrackBounce: true,
                clickMap: true,
                webvisor: true,
                triggerEvent: true
            });
        } catch (e) {
        }
    });

    let n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () {
            n.parentNode.insertBefore(s, n);
        };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else {
        f();
    }
})(document, window, "yandex_metrika_callbacks");