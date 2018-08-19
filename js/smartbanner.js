"use strict";

let ua = navigator.userAgent.toLowerCase();
let isAndroid = ua.indexOf("android") > -1;
if (isAndroid) {
    new SmartBanner({
        daysHidden: 3,   // days to hide banner after close button is clicked (defaults to 15)
        daysReminder: 30, // days to hide banner after "VIEW" button is clicked (defaults to 90)
        appStoreLanguage: 'ru', // language code for the App Store (defaults to user's browser language)
        title: 'Приложение Free-kassa',
        author: '',
        button: 'СКАЧАТЬ',
        store: {
            ios: 'В App Store',
            android: 'В Google Play',
            windows: 'В Windows store'
        },
        price: {
            ios: 'Бесплатно',
            android: 'Бесплатно',
            windows: 'Бесплатно'
        }
        // , theme: '' // put platform type ('ios', 'android', etc.) here to force single theme on all device
        , icon: '/assets/smart-app-banner/ic_launcher-web.png' // full path to icon image if not using website icon image
        , force: 'android' // Uncomment for platform emulation
    });
}

$(document).ready(function () {
    $('body').on('click', '.smartbanner-container>div', function () {
        window.open('http://play.google.com/store/apps/details?id=ru.freekassa.freekassa');
        // $('.smartbanner-button').trigger('click');
        console.log($('.smartbanner-button').html());
    })
})