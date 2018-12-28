;(function($) {
    "use strict";
	
    //* mainNavbar
    function mainNavbar(){
        if ( $('#main_navbar').length ){ 
             $('#main_navbar').affix({
                offset: {
                    top: 10,
                    bottom: function () {
                        return (this.bottom = $('.footer').outerHeight(true))
                    }
                }
            }); 
        };
    };
    
	 //* nav_searchFrom
    function searchFrom(){
        if ( $('.nav_searchFrom').length ){  
             $('.nav_searchFrom').on('click',function(){
                $('.searchForm').toggleClass('show');
                return false
            });
            $('.form_hide').on('click',function(){
                $('.searchForm').removeClass('show')
            });
            $('.form-control').find( "div" ).css( "color", "red" )
        };
    };
    
    //*  Main slider js 
    function home_main_slider(){
        if ( $('.slider_inner').length ){
            $('.slider_inner').camera({
                loader: true,
                navigation: true,
                autoPlay:false,
                time: 4000,
                playPause: false,
                pagination: false,
                thumbnails: false,
                overlayer: true,
                hover: false,  
                minHeight: '500px',
            }); 
        }
    }
    
    //* Isotope Js
    function portfolio_isotope(){
        if ( $('.portfolio_item, .portfolio_2 .portfolio_filter ul li').length ){
            // Activate isotope in container
            $(".portfolio_item").imagesLoaded( function() {
                $(".portfolio_item").isotope({
                    itemSelector: ".single_facilities",
                    layoutMode: 'masonry',
                    percentPosition:true,
                    masonry: {
                        columnWidth: ".grid-sizer, .grid-sizer-2"  
                    }            
                }); 
            }); 
            
            // Activate isotope in container
            $(".portfolio_2").imagesLoaded( function() {
                $(".portfolio_2").isotope({
                    itemSelector: ".single_facilities",
                    layoutMode: 'fitRows',
                }); 
            });
            // Add isotope click function
            $(".portfolio_filter ul li").on('click',function(){
                $(".portfolio_filter ul li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr("data-filter");
                $(".portfolio_item, .portfolio_2").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 450,
                        easing: "linear",
                        queue: false,
                    }
                });
                return false;
            });
        }
    };
    
    // * Stellar 
    // $(function(){
    //     $.stellar({
    //         horizontalScrolling: false,
    //         verticalOffset: 40
    //     });
    // });
    
     //* counterUp JS
    function counterUp(){
        if ( $('.counter').length ){ 
            $('.counter').counterUp({
                delay: 10,
                time: 900,
            });
        } 
    }; 
    
    //* Testimonial Carosel
    function testimonialsCarosel(){
        if ( $('.testimonial_carosel').length ){
            $('.testimonial_carosel').owlCarousel({
                loop:true,
                items:1,
                autoplay:false,
            });
        };
    };
    
     //* counterUp 2 JS
    function counterUp2(){
        if ( $('.counter2').length ){ 
            $('.counter2').counterUp({
                delay: 10,
                time: 200,
            });
        } 
    }; 
    
    //Scroll on top button
	var btn = $("#toTopButton");
	
	$(window).scroll(function() {
		if ($(window).scrollTop() > 300) {
			btn.addClass("show");
		} else {
			btn.removeClass("show");
		}
	});

	btn.on("click", function(e) {
		e.preventDefault();
		$("html, body").animate({scrollTop:0}, "300");
	})
    
    
    /*Function Calls*/ 
    searchFrom ();
	home_main_slider();
    testimonialsCarosel ();
    portfolio_isotope ();
    counterUp (); 
    counterUp2 ();
    mainNavbar ();
    // preloader ();
    
})(jQuery);