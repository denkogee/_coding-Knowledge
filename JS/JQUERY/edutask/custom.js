(function($) {
    "use strict";
    var typedddddd = $("#typedddddd").val();
    var themeparker = {
        initialize: function() {
            this.navBar();
            this.backgroundImage();
            this.scrollbar();
            this.select();
            this.toTop();
            this.stickyShare();
            this.popover();
            this.brandLogoCarousel();
            this.blogCarousel();
            if (typedddddd == 1) {
                this.textTyped();
            }
        },
        navBar: function() {
            var header = $(".fixed-top");
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= 1) {
                    header.removeClass('navbar-transfarent').addClass("navbar-bg");
                } else {
                    header.removeClass("navbar-bg").addClass('navbar-transfarent');
                }
            });
            var windows = $(window);
            var stick = $(".header-sticky");
            windows.on('scroll', function() {
                var scroll = windows.scrollTop();
                if (scroll < 245) {
                    stick.removeClass("sticky");
                } else {
                    stick.addClass("sticky");
                }
            });
        },
        backgroundImage: function() {
            $(".bg-image").css("background", function() {
                var bg = "url(" + $(this).data("image-src") + ") #eee no-repeat center center";
                return bg;
            });
        },
        scrollbar: function() {
            $('.notifications-scroll').each(function() {
                const ps = new PerfectScrollbar($(this)[0]);
            });
        },
        select: function() {
            $('.select1').SumoSelect({
                okCancelInMulti: true,
                selectAll: true
            });
        },
        blogCarousel: function() {
            var slider_preloader_status = $(".slider_preloader_statusr");
            var slider_preloader = $(".slider_preloader");
            var header_slider = $(".header-slider");
            slider_preloader_status.fadeOut();
            slider_preloader.delay(350).fadeOut('slow');
            header_slider.removeClass("header-slider-preloader");
            $('.blog-carousel').owlCarousel({
                autoHeight: true,
                loop: true,
                margin: 5,
                items: 2,
                dots: false,
                center: true,
                nav: true,
                navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1000: {
                        items: 2
                    }
                }
            });
        },
        toTop: function() {
            $('body').append('<div id="toTop" class="btn-top"><i class="feather icon-arrow-up"></i></div>');
            $(window).scroll(function() {
                if ($(this).scrollTop() !== 0) {
                    $('#toTop').fadeIn();
                } else {
                    $('#toTop').fadeOut();
                }
            });
            $('#toTop').on('click', function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                return false;
            });
        },
        stickyShare: function() {
            $('.stickyshare, .stickydetails').theiaStickySidebar({
                additionalMarginTop: 155
            });
        },
        popover: function() {
            $('[data-toggle="popover"]').popover({
                trigger: 'manual'
            }).on('mouseenter', function() {
                var _this = this;
                $(this).popover('show');
                $('.popover').on('mouseleave', function() {
                    $(_this).popover('hide');
                });
            }).on('mouseleave', function() {
                var _this = this;
                setTimeout(function() {
                    if (!$('.popover:hover').length) {
                        $(_this).popover('hide');
                    }
                }, 0);
            });
        },
        brandLogoCarousel: function() {
            $('.brand-logo-carousel').owlCarousel({
                loop: true,
                autoplay: true,
                margin: 15,
                dots: false,
                nav: false,
                navText: ["<i class='angle-left'></i>", "<i class='angle-right'></i>"],
                responsive: {
                    0: {
                        items: 2
                    },
                    576: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    1200: {
                        items: 5
                    }
                }
            });
        },
        textTyped: function() {
            var typed = new Typed('.typed', {
                stringsElement: '.typed-strings',
                loop: true,
                typeSpeed: 30
            });
        },
    };
    const menu = new MmenuLight(document.querySelector('#menu'), {});
    menu.enable("(max-width: 991px)");
    menu.offcanvas({});
    document.querySelector('a[href="#menu"]').addEventListener('click', (evnt) => {
        menu.open();
        evnt.preventDefault();
        evnt.stopPropagation();
    });
    $(document).ready(function() {
        themeparker.initialize();
    });
}(jQuery));
