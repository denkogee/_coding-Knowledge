(function($) {
    "use strict";
    $("document").ready(function() {
        var base_url = $("#base_url").val();
        $('#default').raty({
            starHalf: base_url + 'application/modules/frontend/views/themes/default/assets/plugins/raty/lib/images/star-half.png',
            starOff: base_url + 'application/modules/frontend/views/themes/default/assets/plugins/raty/lib/images/star-off.png',
            starOn: base_url + 'application/modules/frontend/views/themes/default/assets/plugins/raty/lib/images/star-on.png'
        });
        $('[data-toggle="tooltip"]').tooltip()
        var session_id = $("#session_id").val();
        var cart_contents = $("#cart_contents").val();
        var CSRF_TOKEN = $('#CSRF_TOKEN').val();
        if (cart_contents && !session_id) {
            $.ajax({
                url: base_url + "login-form",
                type: "POST",
                data: {
                    'csrf_test_name': CSRF_TOKEN
                },
                success: function(r) {
                    $(".modal_ttl").html("Login to your account");
                    $("#info").html(r);
                    $("#modal_info").modal('show');
                }
            });
        }
        var rating_success_msg = $("#rating_success_msg").val();
        if (rating_success_msg) {
            toastrSuccessMsg("Rating submitted successfully");
        }
        $(".se-pre-con").fadeOut("slow");
        var popup = $("#popup").val();
        if (popup == 1) {
            setTimeout(function() {
                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 1500,
                    onHidden: function() {}
                };
                toastr.success("Order submited successfully!");
            }, 1000);
        }
        $("body").on('click', '#confirm_btn', function() {
            var base_url = $("#base_url").val();
            var CSRF_TOKEN = $('#CSRF_TOKEN').val();
            var name = $("#name").val();
            var email = $("#mail").val();
            var mobile = $("#mobile").val();
            var address = $("#address").val();
            var country_id = $("#country_id").val();
            var city = $("#city").val();
            var state = $("#state").val();
            if (name == '') {
                $("#name").focus();
                toastrErrorMsg("Name must be required!");
                return false;
            }
            if (email == '') {
                $("#mail").focus();
                toastrErrorMsg("Email must be required!");
                return false;
            }
            if (mobile == '') {
                $("#mobile").focus();
                toastrErrorMsg("Mobile No must be required!");
                return false;
            }
            if (address == '') {
                $("#address").focus();
                toastrErrorMsg("Address must be required!");
                return false;
            }
            if (country_id == '') {
                $("#country_id").focus();
                toastrErrorMsg("Country must be required")
                return false;
            }
            if (city == '') {
                $("#city").focus();
                toastrErrorMsg("City must be required");
                return false;
            }
            if (state == '') {
                $("#state").focus();
                toastrErrorMsg("State must be required");
                return false;
            }
            if (IsEmail(email) == false) {
                toastrErrorMsg("Invalid mail");
                return false;
            }
            if (!$('.p_method').is(":checked")) {
                toastrErrorMsg("Payment method must be required!");
                return false;
            }
            var password = $("#pass").val();
            var confirm_password = $("#confirmpw").val();
            if (password != confirm_password) {
                toastrErrorMsg("Confirm password does not match");
                $("#confirmpw").val('');
                $("#confirmpw").focus();
                return false;
            }
        });
        $('.login_submit').keydown(function(e) {
            if (e.keyCode == 13) {
                loginProcess();
            }
        });
        var CSRF_TOKEN = $('#CSRF_TOKEN').val();
        $('input.typeahead').typeahead({
            highlight: true,
            minLength: 1,
            source: function(query, result) {
                $.ajax({
                    url: base_url + "autocomplete-course-search",
                    data: {
                        'csrf_test_name': CSRF_TOKEN,
                        query: query
                    },
                    dataType: "json",
                    type: "POST",
                    success: function(data) {
                        result($.map(data, function(item) {
                            return item.name;
                        }));
                    },
                });
            }
        });
        $('.payment-item label').on('click', function(event) {
            if ($(this).next().hasClass('in')) {
                $(this).next().collapse('show');
            } else {
                $(this).parents('.payment-block').find('.collapse').collapse('hide');
                $(this).next().collapse('show');
            }
        });
        var progress_bar_5 = $(".progress_bar_5").val();
        var progress_bar_4 = $(".progress_bar_4").val();
        var progress_bar_3 = $(".progress_bar_3").val();
        var progress_bar_2 = $(".progress_bar_2").val();
        var progress_bar_1 = $(".progress_bar_1").val();
        $(".progressbar_5").css({
            'width': progress_bar_5
        });
        $(".progressbar_4").css({
            'width': progress_bar_4
        });
        $(".progressbar_3").css({
            'width': progress_bar_3
        });
        $(".progressbar_2").css({
            'width': progress_bar_2
        });
        $(".progressbar_1").css({
            'width': progress_bar_1
        });
    });
}(jQuery));
"use strict";

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}
$(".password_area").css({
    'display': 'none'
});
"use strict";

function create_account() {
    if ($('input#account_check').is(':checked')) {
        $(".password_area").slideToggle();
    } else {
        $(".password_area").slideToggle();
    }
    if ($('#account_check').is(':checked')) {
        $('#account_check').attr('value', '1');
    } else {
        $('#account_check').attr('value', '0');
    }
}
$(".shipping_area").css({
    'display': 'none'
});
"use strict";

function shipping_address_status() {
    if ($('input#is_different').is(':checked')) {
        $(".shipping_area").slideToggle();
    } else {
        $(".shipping_area").slideToggle();
    }
    if ($('#is_different').is(':checked')) {
        $('#is_different').attr('value', '1');
    } else {
        $('#is_different').attr('value', '0');
    }
}
"use strict";

function toastrErrorMsg(r) {
    setTimeout(function() {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 1500,
        };
        toastr.error(r);
    }, 1000);
}
"use strict";

function toastrSuccessMsg(r) {
    setTimeout(function() {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 1500,
            onHidden: function() {
                window.location.reload();
            }
        };
        toastr.success(r);
    }, 1000);
}
"use strict";

function get_loginform() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    $.ajax({
        url: base_url + "login-form",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN
        },
        success: function(r) {
            $(".modal_ttl").html("Login to your account");
            $("#info").html(r);
            $("#modal_info").modal('show');
        }
    });
}
"use strict";

function get_facultyregisterform() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    $.ajax({
        url: base_url + "faculty-register-form",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN
        },
        success: function(r) {
            $(".modal_ttl").html("Faculty Registration");
            $("#info").html(r);
            $("#modal_info").modal('show');
        }
    });
}
"use strict";

function get_studentregisterform() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    $.ajax({
        url: base_url + "student-register-form",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN
        },
        success: function(r) {
            $(".modal_ttl").html("Student Registration");
            $("#info").html(r);
            $("#modal_info").modal('show');
        }
    });
}
"use strict";

function register_save() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var name = $("#rname").val();
    var mobile = $("#rmobile").val();
    var utype = $("#rutype").val();
    var email = $("#remail").val();
    var username = $("#remail").val();
    var password = $("#rpassword").val();
    var confirmPassword = $("#rconfirmPassword").val();
    if (name == '') {
        $("#name").css({
            'border': '2px solid red'
        }).focus();
        toastrErrorMsg("Name must be required!");
        return false;
    } else {
        $("#name").css({
            'border': '2px solid green'
        });
    }
    if (mobile == '') {
        $("#mobile").css({
            'border': '2px solid red'
        }).focus();
        toastrErrorMsg("Mobile must be required!");
        return false;
    } else {
        $("#mobile").css({
            'border': '2px solid green'
        });
    }
    if (utype == '') {
        $("#utype").css({
            'border': '2px solid red'
        }).focus();
        toastrErrorMsg("User type must be required!");
        return false;
    } else {
        $("#utype").css({
            'border': '2px solid green'
        });
    }
    if (email == '') {
        $("#email").css({
            'border': '2px solid red'
        }).focus();
        toastrErrorMsg("Email must be required!");
        return false;
    } else {
        $("#email").css({
            'border': '2px solid green'
        });
    }
    if (password == '') {
        $("#password").css({
            'border': '2px solid red'
        }).focus();
        toastrErrorMsg("Password must be required!");
        return false;
    } else {
        $("#password").css({
            'border': '2px solid green'
        });
    }
    if (password != confirmPassword) {
        toastrErrorMsg("Confirm password does not match");
        $("#rconfirmPassword").val('');
        $("#rconfirmPassword").focus();
        return false;
    }
    $.ajax({
        url: base_url + "register-save",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN,
            name: name,
            mobile: mobile,
            utype: utype,
            email: email,
            username: username,
            password: password
        },
        success: function(r) {
            if (r == 'Mail already exists') {
                toastrErrorMsg(r);
            } else if (r == 'Username already exists') {
                toastrErrorMsg(r);
            } else if (r == 'not_valid_email') {
                toastrErrorMsg("Please enter valid email");
            } else {
                toastrSuccessMsg(r);
                $('#modal_info').modal('hide');
            }
        }
    });
}
"use strict";

function is_receive() {
    if ($("#is_receive").is(':checked')) {
        $('#is_receive').attr('value', '1');
    } else {
        $('#is_receive').attr('value', '0');
    }
}
"use strict";

function is_remember() {
    if ($("#rememberme").is(':checked')) {
        $('#rememberme').attr('value', '1');
    } else {
        $('#rememberme').attr('value', '0');
    }
}
"use strict";

function subscriber_save() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var email = $("#email").val();
    var is_receive = $("#is_receive").val();
    if (email == '') {
        toastrErrorMsg("Email must be required!");
        $("#email").val('').focus();
        return false;
    }
    $.ajax({
        url: base_url + "subscriber-save",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN,
            email: email,
            is_receive: is_receive
        },
        success: function(r) {
            if (r == 'error') {
                toastrErrorMsg("This email already subscribed");
            } else if (r == 'not_valid_email') {
                toastrErrorMsg("Please enter valid email");
            } else {
                toastrSuccessMsg("Subscribed successfully");
            }
            $("#email").val('').focus();
            $('#is_receive').prop('checked', false);
        }
    });
}
"use strict";

function review_submitcheck() {
    toastrErrorMsg("Login must be required!");
    get_loginform();
    return false;
}
"use strict";

function review_submit() {
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var score = $("input[name=score]").val();
    var base_url = $("#base_url").val();
    var customer_id = $("#customer_id").val();
    var product_id = $("#product_id").val();
    var reviewer_name = $("#reviewer_name").val();
    var reviewer_email = $("#reviewer_email").val();
    var review = $("#review").val();
    if (score == '') {
        toastrErrorMsg("Rating must be required");
        return false;
    }
    $.ajax({
        url: base_url + "review-save",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN,
            customer_id: customer_id,
            product_id: product_id,
            reviewer_name: reviewer_name,
            reviewer_email: reviewer_email,
            review: review,
            score: score
        },
        success: function(r) {
            toastrSuccessMsg(r);
        }
    });
}
"use strict";

function addtomycourse(course_id) {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var user_id = $("#user_id").val();
    var user_type = $("#user_type").val();
    if (user_type != 4) {
        toastrErrorMsg("You have to login first!");
        return false;
    } else {
        var course_id = $("#course_id_" + course_id).val();
        var coursename = $("#course_name_" + course_id).val();
        var qty = $("#qty").val();
        var price = $("#price_" + course_id).val();
        var picture = $("#picture_" + course_id).val();
        $.ajax({
            url: base_url + "add-to-mycourse",
            type: 'POST',
            data: {
                'csrf_test_name': CSRF_TOKEN,
                user_id: user_id,
                course_id: course_id,
                coursename: coursename,
                qty: qty,
                price: price,
                picture: picture
            },
            success: function(r) {
                toastrSuccessMsg(r);
            }
        });
    }
}
"use strict";

function addtocart(course_id) {
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var course_id = $("#course_id_" + course_id).val();
    var coursename = $("#course_name_" + course_id).val();
    var slug = $("#slug_" + course_id).val();
    var qty = $("#qty").val();
    var price = $("#price_" + course_id).val();
    var old_price = $("#old_price_" + course_id).val();
    var picture = $("#picture_" + course_id).val();
    var base_url = $("#base_url").val();
    $.ajax({
        url: base_url + "add-to-cart",
        type: 'POST',
        data: {
            'csrf_test_name': CSRF_TOKEN,
            course_id: course_id,
            coursename: coursename,
            slug: slug,
            qty: qty,
            price: price,
            old_price: old_price,
            picture: picture
        },
        success: function(r) {
            toastrSuccessMsg(r);
            setTimeout(function() {
                window.location.href = base_url + "cart";
            }, 1000);
        }
    });
}
"use strict";

function quantity_cals(sl, qty) {
    var price = $("#price_" + sl).val();
    var subtotal = parseFloat(price) * qty;
    $("#subtotal_txt_" + sl).text(subtotal);
    $("#subtotal_" + sl).val(subtotal);
}
"use strict";

function cart_update(sl, rowid) {
    var base_url = $("#base_url");
    var qty = $("#qty_" + sl).val();
    $.ajax({
        url: base_url + "cart-update",
        type: "POST",
        data: {
            rowid: rowid,
            qty: qty
        },
        success: function(r) {
            toastrSuccessMsg(r);
        }
    });
}
"use strict";

function cart_delete(sl, rowid) {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var qty = 0;
    var r = confirm("Are you sure")
    if (r == true) {
        $.ajax({
            url: base_url + "cart-delete",
            type: "POST",
            data: {
                'csrf_test_name': CSRF_TOKEN,
                rowid: rowid,
                qty: qty
            },
            success: function(r) {
                toastrSuccessMsg(r);
            }
        });
    }
}
"use strict";

function enroll_save(sl) {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var user_type = $("#user_type").val();
    var user_id = $("#user_id").val();
    if (user_type == '') {
        toastrErrorMsg('Login must be required!');
        return false;
    } else {
        var product_id = $("#course_id_" + sl).val();
        $.ajax({
            url: base_url + "enroll-save",
            type: "POST",
            data: {
                'csrf_test_name': CSRF_TOKEN,
                product_id: product_id,
                user_id: user_id
            },
            success: function(r) {
                toastrSuccessMsg(r);
            }
        });
    }
}
"use strict";

function loginProcess() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var email = $("#email").val();
    var password = $("#password").val();
    var checkout = $("#checkout").val();
    var rememberme = $("#rememberme").val();
    if (email == '') {
        toastrErrorMsg("Email must be required!");
        $("#email").val('').focus();
        return false;
    }
    if (password == '') {
        toastrErrorMsg("Password must be required!");
        $("#password").val('').focus();
        return false;
    }
    $.ajax({
        url: base_url + "login-process",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN,
            email: email,
            password: password,
            rememberme: rememberme
        },
        success: function(r) {
            if (r == 'invalidAccess') {
                toastrErrorMsg("Email or password is invalid");
                $("#email").val('').focus();
                $("#password").val('');
            } else if (r == 'facultylogin' || r == 'adminlogin') {
                document.location.href = base_url + 'dashboard/home';
            } else if (r == 0) {
                toastrErrorMsg("Please wait for admin approval");
                return false;
            } else {
                if (checkout == 'checkout') {
                    setTimeout(function() {
                        toastr.options = {
                            closeButton: true,
                            progressBar: true,
                            showMethod: 'slideDown',
                            timeOut: 1500,
                            onHidden: function() {
                                document.location.href = base_url + 'checkout';
                            }
                        };
                        toastr.success("Login Successfully!");
                    }, 1000);
                } else {
                    setTimeout(function() {
                        toastr.options = {
                            closeButton: true,
                            progressBar: true,
                            showMethod: 'slideDown',
                            timeOut: 1500,
                            onHidden: function() {
                                document.location.href = base_url;
                            }
                        };
                        toastr.success("Login Successfully!");
                    }, 1000);
                }
            }
        }
    });
}
"use strict";

function checkout_unique_mailcheck(email) {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    $.ajax({
        url: base_url + "checkout-unique-mailcheck",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN,
            email: email
        },
        success: function(r) {
            if (r == 1) {
                toastrErrorMsg("Mail already exists");
                $("#mail").val('').focus();
                return false;
            }
        }
    });
}
"use strict";

function checkout_signup() {
    $("#modal_info").modal('hide');
}
"use strict";

function typeahead_search() {
    var item = $("#item").val();
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    if (item == '') {
        toastrErrorMsg("Empty field not allow!");
        return false;
    }
    $.ajax({
        url: base_url + "typeahead-search",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN,
            item: item
        },
        success: function(r) {
            $(".content_search").html(r);
        }
    });
}
"use strict";

function send_comment() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var user_type = $("#user_type").val();
    var user_id = $("#user_id").val();
    var event_id = $("#event_id").val();
    var comment = $("#comment").val();
    if (comment == '') {
        toastrErrorMsg("Empty field not allow");
        return false;
    }
    if (user_type == '' && user_id == '') {
        toastrErrorMsg("Please login firstly");
    } else {
        $.ajax({
            url: base_url + "send-comment",
            type: "POST",
            data: {
                'csrf_test_name': CSRF_TOKEN,
                user_id: user_id,
                event_id: event_id,
                comment: comment
            },
            success: function(r) {
                $("#comment").val('');
                toastrSuccessMsg(r);
                window.reload();
            }
        });
    }
}
"use strict";

function mail_specialcharacter_remove(vtext, id) {
    var specialChars = $("#mail_specialcharacter_remove").val();
    var check = function(string) {
        for (i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return true
            }
        }
        return false;
    }
    if (check($('#' + id).val()) == false) {} else {
        toastrErrorMsg(specialChars + " these special character are not allowed")
        $("#" + id).val('').focus();
    }
}
"use strict";

function coursespecial_character_remove(vtext, id) {
    var specialChars = $("#coursespecial_character").val();
    var check = function(string) {
        for (i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return true
            }
        }
        return false;
    }
    if (check($('#' + id).val()) == false) {} else {
        toastrErrorMsg(specialChars + " these special character are not allowed")
        $("#" + id).val('').focus();
    }
}
"use strict";

function special_character_remove(vtext, id) {
    var specialChars = $("#security_character").val();
    var check = function(string) {
        for (i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return true
            }
        }
        return false;
    }
    if (check($('#' + id).val()) == false) {} else {
        toastrErrorMsg(specialChars + " these special character are not allowed")
        $("#" + id).val('').focus();
    }
}
"use strict";

function onlynumber_allow(vtext, id) {
    var specialChars = $("#onlynumber_allow").val();
    var check = function(string) {
        for (i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return true
            }
        }
        return false;
    }
    if (check($('#' + id).val()) == false) {} else {
        toastrErrorMsg(specialChars + " these special character are not allowed")
        $("#" + id).val('').focus();
    }
}
"use strict";

function forgotpassword_form() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    $.ajax({
        url: base_url + "forgotpassword-form",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN
        },
        success: function(r) {
            $(".modal_ttl").html("Forgot Password");
            $(".loadpage").html(r);
        }
    });
}
"use strict";

function forgotpassword_send() {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    var email = $("#email").val();
    if (email == '') {
        toastrErrorMsg("Empty field not allow");
        return false;
    }
    if (IsEmail(email) == false) {
        toastrErrorMsg("Invalid mail");
        return false;
    }
    toastrErrorMsg("Mail option didn't set yet");
    return false;
    $.ajax({
        url: base_url + "forgot-password-send",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN,
            email: email
        },
        success: function(r) {
            $("#email").val('');
            toastrSuccessMsg(r);
        }
    });
}
"use strict";

function purchaselessoncheck() {
    toastrErrorMsg("You have to purchase this course first");
    return false;
}
"use strict";

function courseQuickView(course_id) {
    var base_url = $("#base_url").val();
    var CSRF_TOKEN = $('#CSRF_TOKEN').val();
    $.ajax({
        url: base_url + "course-quick-view",
        type: "POST",
        data: {
            'csrf_test_name': CSRF_TOKEN,
            course_id: course_id
        },
        success: function(r) {
            $("#course_view").html(r);
            $("#courseQuickView").modal('show');
        }
    });
}
