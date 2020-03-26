/*
Theme Name: Nominee
Author: TrendyTheme
*/

/* ======= TABLE OF CONTENTS ================================== 

    # Preloader
    # jQuery for page scrolling feature - requires jQuery Easing plugin
    # Sticky Menu
    # superslides
    # Enable bootstrap tooltip
    # Textrotator
    # Counter
    # Social Counter
    # Twitter Feed Carousel
    # Magnific Popup for image
    # Magnific Popup for embeds
    # Social share popup window
    # Issue carousel
    # Nominee Carousel
    # Nominee carousel height control
    # Latest post carousel
    # Testimonial Carousel
    # Archivement Carousel
    # Team Carousel
    # Client Carousel
    # Countdown
    # Detect IE version
    # Back to Top
    # Google Map
    # Shuffle for reformation filter
    # Masonry Grid
    # Placeholder
    # Ticker
    # Flickr photo
    # Donate amount select
    # Gallery
    # Newsletter popup
    # Login register form

========================================================= */

jQuery(function ($) {

    'use strict';


    /* === Preloader === */
    (function() {
        var $preloader = $('#preloader');
        if (!$preloader.length) {
            return;
        }
        $(window).on('beforeunload', function() {
            $preloader.fadeIn('slow');
        });
        $preloader.fadeOut(800);
    }());


    /* === Add Remove Class === */
    (function() {
        $('.comment-respond .comment-form input[type="text"], .comment-respond .comment-form input[type="url"], .comment-respond .comment-form input[type="email"], .comment-respond .comment-form textarea, .charitable-donation-form input, .charitable-donation-form select').addClass('form-control');
    }());
    

    /* === jQuery for page scrolling feature - requires jQuery Easing plugin === */
    (function () {

        $('.navbar-nav a[href^="#"], .tt-scroll').on('click', function (e) {
            e.preventDefault();

            var target = this.hash;
            var $target = $(target);
            var headerHeight = $('.navbar, .navbar.sticky').outerHeight();
            
            if (target) {
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top - headerHeight + "px"
                }, 1200, function () {
                    window.location.hash = target;
                });
            }
        });
    }());


    /* === Mobile Dropdown Menu === */
    (function(){
        $('.dropdown-menu-trigger').each(function() {
            $(this).on('click', function(e){
                $(this).toggleClass('menu-collapsed');
            });
        });
    }());

    /* === Toogle sidebar === */
    (function(){
        $('.tt-toggle-button > button').on('click', function(e){
            $('body').toggleClass('tt-sidebar-open');
        });
        $('.tt-offcanvas-sidebar .offcanvas-overlay, .offcanvas-container .tt-close').on('click', function(e){
            $('body').removeClass('tt-sidebar-open');
        });
    }());


    /* === Sticky Menu === */
    (function () {
        var nav = $('.header-transparent .navbar, .header-style-box-style .header-wrapper, .header-default .header-wrapper, .header-style-fullwidth .header-wrapper, .header-style-center-logo .header-wrapper');
        var scrolled = false;

        var headerHeight = $('.header-wrapper').outerHeight();

        $(window).scroll(function () {
            if (150 < $(window).scrollTop() && !scrolled) {

                $('.site-wrapper').css('padding-top', headerHeight +"px");

                nav.addClass('sticky animated fadeInDown').animate({ 'margin-top': '0px' });
                scrolled = true;
            }

            if (20 > $(window).scrollTop() && scrolled) {

                $('.site-wrapper').css('padding-top', '0');

                nav.removeClass('sticky animated fadeInDown').animate('margin-top', '0px');
                scrolled = false;
            }
        });
    }());


    /* ======= superslides ======= */
    if ($('#slides').length > 0 ) {
        $('#slides').superslides({
            play: 7000, 
            animation: 'fade'
        });
    }
    

    /* ======= Enable bootstrap tooltip ======= */
    (function () {
        $('[data-toggle="tooltip"]').tooltip()
    }());


    /* ======= Textrotator ======= */
    var ttAnimation = $('.rotate').attr('data-animation');
    var ttAniSpeed = $('.rotate').attr('data-speed');

    $(".rotate").textrotator({
        animation: ttAnimation, // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: "|", //  You can define a new separator (|, &, * etc.) by yourself using this field.
        speed: ttAniSpeed // How many milliseconds until the next word show.
    });


    /* === Counter === */
    $('.fact-wrap, .tt-fundraise-wrapper').on('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).off('inview');
        }
    });


    /* === Social Counter === */
    $('.social-counter').on('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.count').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).off('inview');
        }
    });


    /* === Twitter Feed Carousel === */
    
    (function () {
        var twitterFeed = $('.twitterfeed').attr('data-twitter-id');
        var ttMaxTweet = $('.twitterfeed').attr('data-max-tweet');
        var feedConfig = {
            "profile": {"screenName": twitterFeed},
            "domId": 'twitterfeed',
            "maxTweets": ttMaxTweet,
            "enableLinks": true, 
            "showUser": false,
            "showTime": true,
            "showImages": false,
            "showRetweet": false,
            "showInteraction": false,
            "lang": 'en',
            "customCallback": carouselTweets
        };
        twitterFetcher.fetch(feedConfig);

        function carouselTweets(tweets) {
            var x = tweets.length;
            var n = 0;
            var html = "";
            while (n < x) {
                html += '<div class="item">' + tweets[n] +
                    "</div>";
                n++
            }
            $(".twitter-carousel").html(html);
            $(".twitter_retweet_icon").html(
                '<i class="fa fa-retweet"></i>');
            $(".twitter_reply_icon").html(
                '<i class="fa fa-reply"></i>');
            $(".twitter_fav_icon").html(
                '<i class="fa fa-star"></i>');
            $(".twitter-carousel").owlCarousel({
                dots: true,
                items: 1,
                loop: true,
                autoplayHoverPause: true,
                autoplay: true
            });
        }
    }());

    /* === Twitter Feed === */
    (function () {

        var ttTwitterID = $('.spokesman-tweet').attr('data-twitter-id');
        var ttMaxTweet = $('.spokesman-tweet').attr('data-max-tweet');
        var ttConfig = {
            "profile": {"screenName": ttTwitterID},
            "domId": 'twitterfeed',
            "maxTweets": ttMaxTweet,
            "enableLinks": true, 
            "showUser": true,
            "showTime": true,
            "showImages": false,
            "showRetweet": false,
            "showInteraction": false,
            "lang": 'en',
            customCallback: ttHandleTweets
        };
        
        function ttHandleTweets(tweets) {
            var x = tweets.length;
            var n = 0;
            var html = "";
            while (n < x) {
                html += '<div class="item">' + tweets[n] +
                    "</div>";
                n++
            }
            $(".tt-tweets").html(html);
        }
        twitterFetcher.fetch(ttConfig);

    }());


    /* ======= Magnific Popup ======= */
    $(window).load(function(){
        $(".image-link").magnificPopup({
            type: 'image',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            fixedContentPos: false,
            gallery:{
                enabled:true
            }
        });
    });


    /* ======= Magnific Popup for product image ======= */
    $(window).load(function(){
        $(".woocommerce-product-gallery__image > a, .widget .gallery-item a").magnificPopup({
            type:'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            gallery: {
                enabled: true
            },
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            },
            removalDelay: 300, // Delay in milliseconds before popup is removed
            mainClass: 'mfp-no-margins mfp-with-zoom', // this class is for CSS animation below

        });
    });


    /* ======= Magnific Popup for embeds ======= */
    $('.tt-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: true,
        fixedContentPos: false
    });


     /* ======= Social share popup window ======= */
    (function () {
        $('.post-share ul li a').on('click', function () {
            var newwindow = window.open($(this).attr('href'), '', 'height=450,width=700');
            if (window.focus) {
                newwindow.focus()
            }
            return false;
        });
    }());


    /* ======= Issue carousel ======= */
    (function() {
        if ($('.tt-issue-wrapper').length > 0) {
            $('.tt-issue-wrapper').each(function() {
                var issueNav = $(this).find('.issue-carousel').attr('data-issue-nav');
                var issueAutoPlay = $(this).find('.issue-carousel').attr('data-issue-play');

                var isDot = false;
                var isNav = false;

                if (issueNav == 'dots') {
                    isDot = true;
                }
                if (issueNav == 'nav') {
                    isNav = true;
                }

                $('.issue-carousel').owlCarousel({
                    autoplay: issueAutoPlay,
                    autoplayTimeout: 5000,
                    loop: true,
                    margin: 30,
                    items: 3,
                    autoplayHoverPause: true,
                    dots: isDot,
                    nav: isNav,
                    navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        900: {
                            items: 3
                        }
                    }
                });
            });
        }
    }());


    /* ======= Nominee Carousel ======= */
    (function () {
        if ($('.tt-carousel').length > 0) {
            var nomineeRtl = false,
            navigation = $('.tt-carousel').attr('data-navigation'),
            pagination = $('.tt-carousel').attr('data-pagination'),
            noineeLoop = $('.tt-carousel').attr('data-loop'),
            autoplay = $('.tt-carousel').attr('data-autoplay'),
            autoplayTimeout = $('.tt-carousel').attr('data-autoplaytimeout'),
            mouseDrag = $('.tt-carousel').attr('data-mousedrag');

            if (nomineeJSObject.rtl == true) {
                nomineeRtl = true;
            }

            if (navigation == 'visible' ? navigation = true : navigation = false);
            if (pagination == 'visible' ? pagination = true : pagination = false);
            if (noineeLoop == 'enable' ? noineeLoop = true : noineeLoop = false);
            if (mouseDrag == 'enable' ? mouseDrag = true : mouseDrag = false);
            if (autoplay == 'enable' ? autoplay = true : autoplay = false);
            if (autoplayTimeout ? autoplayTimeout : autoplayTimeout = 5000);


            var nomineeOwl = $('.tt-carousel').owlCarousel({
                items : 1,
                autoplay: autoplay,
                autoplayTimeout: autoplayTimeout,
                autoplayHoverPause: true,
                autoplaySpeed: 800,
                navSpeed: 800,
                dotsSpeed: 800,
                loop: noineeLoop,
                mouseDrag: mouseDrag,
                touchDrag: true,
                nav: navigation,
                navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                dots: pagination,
                rtl: nomineeRtl
            });


            // add animate.css class(es) to the elements to be animated
            function setAnimation ( _elem, _InOut ) {
                // Store all animationend event name in a string.
                // cf animate.css documentation
                var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

                _elem.each ( function () {
                  var $elem = $(this);
                  var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

                  $elem.addClass($animationType).one(animationEndEvent, function () {
                    $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
                  });
                });
            }

            // Fired after current slide has been changed
            nomineeOwl.on('changed.owl.carousel', function(event) {

                var $currentItem = $('.owl-item', nomineeOwl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-in]");
                setAnimation ($elemsToanim, 'in');
            });
        }
    }());


    /* ======= Nominee carousel height control ======= */
    (function () {
        if ($('.tt-carousel').length > 0) {
            var carouselWrapper = $('.tt-carousel');
            var carouselItem = $('.tt-carousel .item');

            var largeHeight = carouselWrapper.attr('data-lg-height'),
            mediumHeight = carouselWrapper.attr('data-md-height'),
            smallHeight = carouselWrapper.attr('data-sm-height'),
            mobileHeight = carouselWrapper.attr('data-xs-height'),
            mobileSmallHeight = carouselWrapper.attr('data-xxs-height');
            
            $(window).on('resize load', function(e){
                if(carouselWrapper.innerWidth() > 1400){
                    carouselItem.css('height', largeHeight);
                } else if(carouselWrapper.innerWidth() > 991 && carouselWrapper.innerWidth() < 1399){
                    carouselItem.css('height', mediumHeight);
                } else if(carouselWrapper.innerWidth() > 767 && carouselWrapper.innerWidth() < 992){
                    carouselItem.css('height', smallHeight);
                } else if(carouselWrapper.innerWidth() > 575 && carouselWrapper.innerWidth() < 768){
                    carouselItem.css('height', mobileHeight);
                } else {
                    carouselItem.css('height', mobileSmallHeight);
                }
            });

            
            // Mouse move animation
            if ($('.tt-extra-image').length > 0 ) {
                var lFollowX = 0,
                    lFollowY = 0,
                    x = 0,
                    y = 0,
                    friction = 1 / 20;

                function moveBackground() {
                  x += (lFollowX - x) * friction;
                  y += (lFollowY - y) * friction;
                  
                  var translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

                  $('.tt-carousel .item .tt-extra-image img').css({
                    '-webit-transform': translate,
                    '-moz-transform': translate,
                    'transform': translate
                  });

                  window.requestAnimationFrame(moveBackground);
                }

                $(window).on('mousemove click', function(e) {

                  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
                  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
                  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
                  lFollowY = (10 * lMouseY) / 100;

                });

                moveBackground();
            }
        }
    }());

    /* ======= Latest post carousel ======= */
    (function () {

        $('.latest-post-carousel').owlCarousel({
            autoplay: true,
            loop:true,
            items: 1,
            autoplayHoverPause: true
        })

    }());


    /* ======= Testimonial Carousel ======= */
    (function () {
        $('.testimonial-carousel').owlCarousel({
            autoplay: true,
            autoplayTimeout: 5000,
            loop:true,
            items: 1,
            autoplayHoverPause: true
        })
    }());


    /* ======= Archivement Carousel ======= */
    (function () {
        $('.archivement-carousel').owlCarousel({
            autoplay: true,
            loop:true,
            items: 1,
            autoplayHoverPause: true
        })
    }());


    /* ======= Team Carousel ======= */
    (function () {
        $('.team-carousel').owlCarousel({
            loop:true,
            margin:30,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:4
                }
            }
        })
    }());


    /* ======= Career Carousel ======= */
    (function () {
        if ($('.political-career-wrapper').length > 0) {
            $('.career-carousel').owlCarousel({
                loop: false,
                margin: 15,
                dots: false,
                nav: true,
                items: 4,
                navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                }
            });
        }
    }());


    /* ======= Client Carousel ======= */
    (function () {
        var clientCarousel = $('.client-carousel');
        clientCarousel.hide();
        $(window).on('load', function () {
            clientCarousel.show();
            var itemDesktop = clientCarousel.attr('data-item-desktop');
            var itemTablet = clientCarousel.attr('data-item-tablet');
            var itemMobile = clientCarousel.attr('data-item-mobile');

            clientCarousel.owlCarousel({
                autoplay:true,
                loop:true,
                margin:30,
                dots: false,
                autoplayHoverPause: true,
                responsive:{
                    0:{
                        items:itemMobile
                    },
                    600:{
                        items:itemTablet
                    },
                    1000:{
                        items:itemDesktop
                    }
                }
            })
        })
    }());



    /* ======= Countdown ======= */    
    (function () {
        $('[data-countdown]').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                $this.html(event.strftime(''
                    + '<li><span class="days">%D<span><p>'+nomineeJSObject.count_day+'</p></li>'
                    + '<li><span class="hours">%H<span><p>'+nomineeJSObject.count_hour+'</p></li>'
                    + '<li><span class="minutes">%M<span><p>'+nomineeJSObject.count_minutes+'</p></li>'
                    + '<li><span class="second">%S<span><p>'+nomineeJSObject.count_second+'</p></li>'
                ));
            });
        });
    }());



    /* === Detect IE version === */
    (function () {
        function getIEVersion() {
            var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            return match ? parseInt(match[1], 10) : false;
        }

        if( getIEVersion() ){
            $('html').addClass('ie'+getIEVersion());
        }
    }());


    /* === Detect IOS Mobile device === */
    (function () {
        if( navigator.userAgent.match(/iP(hone|od|ad)/i) ) {
             jQuery('html').addClass('ios-browser');
        }
    }());


    /* ======= Back to Top ======= */
    (function(){
        $('body').append('<div id="toTop"><i class="fa fa-angle-up"></i></div>');

        $(window).scroll(function () {
            if ($(this).scrollTop() !== 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        }); 

        $('#toTop').on('click',function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
    }());



    /* ======= Google Map ======= */
    (function () {
        if ($('#ttmap').length > 0 ) {
            //set your google maps parameters
            var $latitude  = $('#ttmap').attr('data-map-latitude'),
                $longitude = $('#ttmap').attr('data-map-longitude'),
                $map_zoom  = 12;
            /* ZOOM SETTING */

            //google map custom marker icon 
            var $marker_url = $('#ttmap').attr('data-map-marker');

            //we define here the style of the map
            
            var style = [{
                stylers: [{
                    "hue": "#000"
                }, {
                    "saturation": -100
                }, {
                    "gamma": 2.15
                }, {
                    "lightness": 12
                }]
            }];

            //set google map options
            var map_options = {
                center            : new google.maps.LatLng($latitude, $longitude),
                zoom              : $map_zoom,
                panControl        : true,
                zoomControl       : true,
                mapTypeControl    : false,
                streetViewControl : true,
                mapTypeId         : google.maps.MapTypeId.ROADMAP,
                scrollwheel       : false,
                styles            : style
            }
            //initialize the map
            var map = new google.maps.Map(document.getElementById('ttmap'), map_options);
            //add a custom marker to the map                
            var marker = new google.maps.Marker({
                position : new google.maps.LatLng($latitude, $longitude),
                map      : map,
                visible  : true,
                icon     : $marker_url
            });
        }
    }());


    /* === Shuffle for reformation filter  === */
    (function () {
        $(window).on('load', function () {
            $('.reformation-wrap').each(function(i, e){
                var ttGrid = $(this).find('.tt-grid');
                var self = this;
                ttGrid.shuffle({
                    itemSelector: '.tt-item' // the selector for the items in the grid
                });

                /* reshuffle when user clicks button filter item */
                $(this).find('.tt-filter button').on('click',function (e) {
                    e.preventDefault();

                    // set active class
                    $(self).find('.tt-filter button').removeClass('active');
                    $(this).addClass('active');

                    // get group name from clicked item
                    var ttGroupName = $(this).attr('data-group');

                    // reshuffle grid
                    ttGrid.shuffle('shuffle', ttGroupName);
                });
            });
        });
    }());


    /* === Masonry Grid  === */
    $(window).load(function () {
        $('.masonry-wrap').masonry({
            "columnWidth" : ".masonry-column"
        });
    });


    /* === Placeholder  === */
    (function(){
        $('input, textarea, email, number').placeholder();
    }());

    
    /* === Ticker  === */
    $(window).on('load', function () {
        $('.news-ticker-wrapper').fadeIn();
        if (nomineeJSObject.nominee_news_ticker == true) {
            $('.news-ticker').newsTicker({
                row_height: 40,
                max_rows: 1,
                speed: 600,
                direction: 'up',
                duration: 4000,
                autostart: 1,
                pauseOnHover: 1
            });
        }
    }());


    /* === Flickr photo  === */
    (function () {
        var ttFlickr = $('.tt-flickr-photo');
        ttFlickr.jflickrfeed({
        limit: ttFlickr.attr('data-photo-limit'),
        qstrings: {
            id: ttFlickr.attr('data-flickr-id')
        },
        itemTemplate: '<li>'+
                        '<a href="{{image}}" title="{{title}}">' +
                            '<img src="{{image_s}}" alt="{{title}}" />' +
                        '</a>' +
                      '</li>'
        });
    }());
    

    /* === Donate amount select === */
    (function () {
        $('input.others-amount').on('focus', function(){
            $(this).closest('.donate-amount').find('.amount-button').removeClass('active');
        });
    }());


    /* === Blank other donate amount === */
    (function () {
        $('.donate-amount .amount-button').on('click', function(){
            $(this).closest('.donate-amount').find('.others-amount').val('');
        });
    }());


    /* === Gallery === */
    $(window).on('load', function () {
        // The slider being synced must be initialized first
        $('.tt-gallery-wrapper').each(function(i, e){

            var ttGalleryNav = $(this).find('.tt-gallery-nav');
            var ttGalleryThumb = $(this).find('.tt-gallery-thumb');
            var ttGallery = $(this).find('.tt-gallery');

            ttGalleryThumb.flexslider({
                animation     : "slide",
                controlNav    : false,
                animationLoop : true,
                slideshow     : false,
                itemWidth     : 150,
                asNavFor      : ttGallery
            });

            ttGallery.flexslider({
                animation     : "slide",
                directionNav  : false,
                controlNav    : false,
                animationLoop : false,
                slideshow     : false,
                sync          : ttGalleryThumb
            });

            // Navigation 
            ttGalleryNav.find('.prev').on('click', function (e) {
                ttGallery.flexslider('prev')
                return false;
            });

            ttGalleryNav.find('.next').on('click', function (e) {
                ttGallery.flexslider('next')
                return false;
            });
        });
    }());


    /* === Newsletter popup === */
    if (nomineeJSObject.newsletter_popup && nomineeJSObject.is_front_page) {
        $(window).on('load', function () {
            if (nomineeJSObject.newsletter_popup_limit == 1 ) {
                if (document.cookie.indexOf('visited=true') == -1) {
                    var fifteenDays = 1000*60*60*24*15;
                    var expires = new Date((new Date()).valueOf() + fifteenDays);
                    document.cookie = "visited=true;expires=" + expires.toUTCString();
                    setTimeout(function () {
                        $('.tt-newsletter-popup').modal();
                    }, nomineeJSObject.newsletter_popup_time * 1000);
                }
            } else {
                setTimeout(function () {
                    $('.tt-newsletter-popup').modal();
                }, nomineeJSObject.newsletter_popup_time * 1000);
            }
        });
    }


    // wishlist count update
    (function(){
        var ttWishListCount = function() {
            $.ajax({
                data      : {
                    action: 'update_wishlist_count'
                },
                success   : function (data) {
                    // console.log( data );
                    $('.tt-wishlist-count span').html( data );
                },

                url: yith_wcwl_l10n.ajax_url
            });
        };

        $('body').on( 'added_to_wishlist removed_from_wishlist', ttWishListCount );
    }());


    /* === Login register form === */
    (function(){
        $('.toggle').on('click', function() {
          $('.login-wrapper').stop().addClass('active');
        });

        $('.close').on('click', function() {
          $('.login-wrapper').stop().removeClass('active');
        });

        // Perform AJAX login/register on form submit
        $('form#login, form#register').on('submit', function (e) {
            // if (!$(this).valid()) return false;
            $('p.status', this).show().text(nomineeJSObject.loadingmessage);
            var action = 'ajaxlogin';
            var username =  $('form#login #username').val();
            var password = $('form#login #password').val();
            var email = '';
            var security = $('form#login #security').val();
            if ($(this).attr('id') == 'register') {
                var action = 'ajaxregister';
                var username = $('#signonname').val();
                var password = $('#signonpassword').val();
                var email = $('#email').val();
                var security = $('#signonsecurity').val();  
            }  
            var ctrl = $(this);
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: nomineeJSObject.ajaxurl,
                data: {
                    'action': action,
                    'username': username,
                    'password': password,
                    'email': email,
                    'security': security
                },
                success: function (data) {
                    $('p.status', ctrl).text(data.message);
                    if (data.loggedin == true) {
                        document.location.href = nomineeJSObject.redirecturl;
                    }
                }
            });
            e.preventDefault();
        });
    }());

    // sidebar sticky
    (function() {
        $('.sidebar-sticky').ttStickySidebar({
            additionalMarginTop: 0
        });
    }());
});