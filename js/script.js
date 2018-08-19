"use strict";

$(document).ready(function () {
    $('.menu').on('click', 'li:not(.active)', function () {
        $(this).addClass('active').siblings().removeClass('active').closest('.wrapper').find('.pay').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('.pay li').click(function () {
        $('.pay li').removeClass('active');
        $(this).addClass('active');
    });
});