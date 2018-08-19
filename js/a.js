"use strict";

$(document).ready(function () {
    $.fkInit('', function () {
        $.fkLoading(false);
    });

    $('.menu a').click(function (e) {
        e.preventDefault(e);
        $('.c-title-num').removeClass('active');
        $('.step-1').addClass('active');
        $('.pay li').removeClass('active');
    });


    $('.pay li a').click(function (e) {
        e.preventDefault(e);
    });

    $(document).on('click', '.prevent', function (e) {
        e.preventDefault(e);
    });

    $('.pay li').click(function (e) {
        let anchor = $(this).find('a');

        if (anchor.length && anchor.attr('href') != '#') {
            let win = window.open(anchor.attr('href'), '_blank');
            if (win) {
                win.focus();
            }
            return true;
        }

        if ($(this).hasClass('busy')) return false;

        $('.pay li').addClass('busy');

        $('.c-title-num').removeClass('active');
        $('.step-2').addClass('active');

        $.prepareCurrencyForm($(this));
        $.loadForm($.fkLoading(false));
    });

    $(document).on('click', '.pay-i button', function (e) {
        e.preventDefault(e);

        $('.c-title-num').removeClass('active');
        $('.step-3').addClass('active');
        $.processPayment($.fkLoading(false));
    })
    // $('.pay-i button').click(function(e) {
    //     e.preventDefault(e);
    //     $.processPayment($.fkLoading(false));
    // })

    function loading(show) {
        if (show == true) $('.loading').show();
        else $('.loading').hide();
    }

    function calc_order(in_currency) {
        loading(true);

        $.post('/payment/act/calc_order', {currency: in_currency},
            function (data) {
                loading(false);
                if (data.type == 'success') {
                    $('.in_amount').html(data.data.str_amount);
                    console.log(data);
                } else if (data.type == 'error') {
                    $.toast({
                        text: data.desc,
                        showHideTransition: 'fade',  // It can be plain, fade or slide
                        bgColor: '#d9534f',              // Background color for toast
                        textColor: '#fff',            // text color
                        allowToastClose: false,       // Show the close button or not
                        hideAfter: 5000,              // `false` to make it sticky or time in miliseconds to hide after
                        stack: 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                        textAlign: 'left',            // Alignment of text i.e. left, right, center
                        position: 'top-left'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
                    })
                } else {
                    $.toast({
                        text: 'Ïðîèçîøëà íåïðåäâèäåííàÿ îøèáêà',
                        showHideTransition: 'fade',  // It can be plain, fade or slide
                        bgColor: '#d9534f',              // Background color for toast
                        textColor: '#fff',            // text color
                        allowToastClose: false,       // Show the close button or not
                        hideAfter: 5000,              // `false` to make it sticky or time in miliseconds to hide after
                        stack: 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                        textAlign: 'left',            // Alignment of text i.e. left, right, center
                        position: 'top-left'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
                    });

                }
            }, 'json');
    }

    $('body').on('click', '.validate_btce_coupon', function () {
        // $('.validate_btce_coupon').click(function(e) {
        $('.validate_btce_coupon').attr('disabled', 'disabled');
        $.post("/ajax.php", {action: 'validate_btce_coupon', coupon: $('.coupon-code').val()}, function (data) {
            if (data == 'success') {
                $('.c_warning').html('Îïëàòà ïðîøëà óñïåøíî! ×åðåç 10 ñåêóíä âû áóäåòå àâòîìàòè÷åñêè ïåðåíàïðàâëåíû íà ñàéò ïðîäàâöà');
                setTimeout(function () {
                    location.href = '/success.php';
                }, 10000);
            } else if (data) {
                $('.c_warning').html(data);
                $('.validate_btce_coupon').attr('disabled', false);
            } else {
                $('.c_warning').html('Îøèáêà #btc13');
                $('.validate_btce_coupon').attr('disabled', false);
            }
        });
    });

    $('body').on('click', '.validate_exmo_coupon', function () {
        // $('.validate_btce_coupon').click(function(e) {
        $('.validate_btce_coupon').attr('disabled', 'disabled');
        $.post("/ajax.php", {action: 'validate_exmo_coupon', coupon: $('.coupon-code').val()}, function (data) {
            if (data == 'success') {
                $('.c_warning').html('Îïëàòà ïðîøëà óñïåøíî! ×åðåç 10 ñåêóíä âû áóäåòå àâòîìàòè÷åñêè ïåðåíàïðàâëåíû íà ñàéò ïðîäàâöà');
                setTimeout(function () {
                    location.href = '/success.php';
                }, 10000);
            } else if (data) {
                $('.c_warning').html(data);
                $('.validate_exmo_coupon').attr('disabled', false);
            } else {
                $('.c_warning').html('Îøèáêà #btc13');
                $('.validate_exmo_coupon').attr('disabled', false);
            }
        });
    });
});


$.extend({
    fkInit: function (params, callback) {


        // $('.menu ul li').removeClass('active');
        // $('.menu ul li').first().addClass('active');
        // $(".payment_btn .btn").addClass('inactive');
        //
        // $('ul.pay').removeClass('active');
        // $('ul.pay div.using ').remove();
        //
        //
        // $('ul.pay').first().fadeIn("slow", function () {
        //     $('ul.pay').first().addClass('active');
        //
        //     $(window).on("load", function() {
        //         if(typeof callback == 'function'){
        //             callback.call(this);
        //         }
        //     });
        //
        // })
        //
        if ($('#form-data input[name="i"]').val() > 0) {
            let cur_id = $('#form-data input[name="i"]').val();

            let cur_el = $('li[data-id="' + cur_id + '"]');


            let count = $('li[data-id="' + cur_id + '"]').length;

            if (count > 1) {
                cur_el = $('li[data-id="' + cur_id + '"]:eq(1)');
            }
            console.log($('li[data-id="' + cur_id + '"]').length);

            let group_id = cur_el.data('group_id');
            console.log(cur_id, cur_el, group_id);
            $('.pay li').hide();

            $('.pay.group-6 li').show();

            cur_el.show();
            $.selectCurrencies($('li[data-group="' + group_id + '"]'), group_id);

            $('.c-title-num').removeClass('active');
            $('.step-2').addClass('active');

            $.prepareCurrencyForm(cur_el);
            setTimeout(function () {
                $.loadForm($.fkLoading(false));
            }, 2000);
        }

    },
    fkLoading: function (status) {
        console.log(status);
        if (status == true) {
            $('body').append('<div class="loading"><img src="/assets/themes/cash2016late/img/loading.gif"></div>');
        } else {
            $('.loading').remove();
        }
    },
    selectCurrencies: function (el, group) {

        $('.menu ul li').removeClass('active');
        el.addClass('active');

        $('.pay.group').removeClass('active');
        $('.pay.group-0').removeClass('active');
        $('.pay.group-' + group).addClass('active');
        $('.payment_btn .btn').addClass('inactive');

        // $('.currencies .group').filter(function(){ return ! $(this).is(":hidden"); }).fadeOut('fast', function() {
        //
        //     $('.currencies .group-'+group).fadeIn('fast', function() {
        //
        //     });
        // });

    },
    prepareCurrencyForm: function (el) {

        $('.currencies .group div').removeClass('active');
        $('.currencies .group div div.using ').remove();
        $('.payment_btn .btn').removeClass('inactive');

        $('#form-data input[name="i"]').val(el.data('id'));
        $('#user-data input[name="i"]').val(el.data('id'));

        el.addClass('active');
        el.append('<div class="using"></div>');


        $.post("/cash_ajax.php", {
            action: 'recalc_amount',
            payment_data: $('#form-data').serialize(),
            user_data: $('#user-data').serialize()
        }, function (data) {
            if (data.type == 'success') {
                $('.in_amount').html(data.desc);
            }
        }, 'json');
    },

    loadForm: function (callback) {


        if ($('.payment_btn a.btn').attr('disabled')) return false;
        $('.payment_btn a.btn').attr('disabled', 'disabled');

        // $('.form-fields .form .fields').remove();
        $('.form-data').html('');

        $.post("/cash_ajax.php", {action: 'get_fields', values: $('#form-data').serialize()}, function (data) {

            if (data.type == 'success') {

                $.each(data.fields, function (index, data) {

                    if (!data.placeholder) data.placeholder = data.desc;
                    if (!data.value) {
                        let cookie_value = $.cookie('user-data-' + data.name);
                        if (cookie_value) data.value = $.cookie('user-data-' + data.name);
                    }
                    $('.form-data').append('<div class="pay-i"><span>' + data.desc + ':</span><input style="width:238px;" type="' + data.type + '" placeholder="' + data.placeholder + '" name="' + data.name + '" value="' + data.value + '" /></div>');
                });

                setTimeout(function () {
                    $('.form-data').append('<div class="pay-i"><div class="small-loader"></div><button type="submit"  >' + data.btn_text + '</button></div>');
                }, 100);

                if (data.skip_fields == true) {
                    $.processPayment($.fkLoading(false));
                } else {

                    $('.form-fields').fadeIn('slow', function () {
                        if (typeof callback == 'function') {
                            callback.call(this);
                        }
                    });
                }

                setTimeout(function () {
                    $('.pay li').removeClass('busy');
                    $('.s2').show();
                    $('.s3').hide();


                    $('html, body').animate({
                        scrollTop: $(".pay-input").offset().top
                    }, 500);
                }, 500);
            } else {
                alert(data.desc);
            }

            $('.payment_btn a.btn').attr('disabled', false);

        }, 'json');

    },
    processPayment: function (callback) {

        $('#user-data input').removeClass('error');
        $('#user-data input').removeClass('success');
        $('.form-fields .submit .result').remove();

        $('.small-loader').show();

        $.post("/cash_ajax.php", {action: 'validate', values: $('#user-data').serialize()}, function (data) {

            console.log(data);

            if (data.type == 'success') {


                let form_valid = true;

                $.each(data.fields, function (index, data) {

                    let current_field = $('#user-data input[name="' + data.key + '"]');

                    if (data.type == 'error') {
                        current_field.addClass('error').after('<div class="desc">' + data.desc + '</div>');
                        if (form_valid) current_field.focus();
                        form_valid = false;

                    } else if (data.type == 'success') {
                        current_field.addClass('success');
                    } else {
                        current_field.addClass('error').after('<div class="desc">Îøèáêà âàëèäàöèè</div>');
                        form_valid = false;
                    }
                });

                if (form_valid) {
                    $.post("/cash_ajax.php", {
                        action: 'process_payment',
                        payment_data: $('#form-data').serialize(),
                        user_data: $('#user-data').serialize()
                    }, function (data) {
                        // $('.form-fields .submit a').hide();
                        // $('.form-fields .submit').append('<div class="result">'+data+'</div>');

                        $('.small-loader').hide();

                        $.each($('#user-data input'), function (i, el) {
                            let name = $(this).attr('name');

                            $.cookie('user-data-' + name, $(this).val());
                        });
                        // return;

                        $('.c-info').html('<div class="border-box">' + data + '</div>');
                        setTimeout(function () {
                            $('.s3').show();
                            $('.pay li').removeClass('busy');

                            $('html, body').animate({
                                scrollTop: $(".c-info").offset().top
                            }, 500);
                        }, 500);

                    });
                } else {
                    // alert('Ïðè âàëèäàöèè ôîðìû ïðîèçîøëà îøèáêà err #V2');
                }

                // $('.form-fields').fadeIn('slow', function(){
                //     if(typeof callback == 'function'){
                //         callback.call(this);
                //     }
                // });
            } else {
                alert(data.desc);
            }

        }, 'json');
    }
});