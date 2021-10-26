$(window).on("load", function(){
    $(".loader .inner").fadeOut(500, function(){
        $(".loader").fadeOut(750);
    });

    $('.items').isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            queue: false,
        }
    });
});

$(document).ready(function(){

    $("#year").text(new Date().getFullYear());

    $('#slides').superslides({
        play : 3000,
        animation: 'fade',
    });

    var typed = new Typed('.sub', {
        strings: [
            'Flutter Developers', 
            'IT.', 
            'I Play a Games.', 
            'I&lsquo;m an Investor',
            'I like to read a books', 
            'My hobby is Badminton',
            'A Student.'
        ],
        typeSpeed: 70,
        loop : true,
        startDelay: 1000,
        showCursor: false,
    });

    var hours = new Date().getHours();
    var indonesiaText = ''
    if(hours >= 0 && hours < 10) {
        indonesiaText = 'Selamat Pagi';
    } else if(hours >= 10 && hours < 15){
        indonesiaText = 'Selamat Siang';
    } else if(hours >= 15 && hours < 18){
        indonesiaText = 'Selamat Sore';
    } else if(hours >= 18){
        indonesiaText = 'Selamat Malam';
    }

    var typed = new Typed('.greeting-msg .msg', {
        strings: [
            '<span class="indonesia-text">'+indonesiaText+'</span>', 
            '<span class="spanyol-text">Hola</span>', 
            '<span class="france-text">Bonjour</span>',
            '<span class="chinese-text">你 好</span>', 
            '<span class="japan-text">こんにちは</span>', 
            '<span class="korean-text">안녕하십니까</span>', 
            '<span class="germany-text">Guten tag</span>', 
            '<span class="nepali-text">Namastē</span>', 
        ],
        typeSpeed: 70,
        loop : true,
        showCursor: false,
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 4,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            938: {
                items:4
            }
        }
    });

    var skillsTopOffset = $(".skills-section").offset().top;
    var statsTopOffset = $(".stats-section").offset().top;
    var countUpFinished = false;

    $(window).scroll(function(){    
        if(window.pageYOffset > skillsTopOffset - $(window).height() + 200){
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#FFF',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function(from, to, currentValue){
                    $(this.el).find('.percent').text(Math.round(currentValue));
                }
            });
        }

        if(!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200){
            $(".counter").each(function(){
                var value = parseInt($(this).text());
                $(this).countup(value);
            });
            countUpFinished = true
        }
    });

    $("[data-fancybox]").fancybox();

    $("#filters a").click(function(e){
        e.preventDefault();
        
        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr("data-filter");
        $('.items').isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false,
            }
        });
    });


    const nav = $("#navigation");
    const navTop = nav.offset().top;

    $(window).on("scroll", function(){
        if($(window).scrollTop() >= navTop){
            nav.addClass("fixed-top");
        }else {
            nav.removeClass("fixed-top");
        }
    });

    $("#navigation li a").click(function(e){
        e.preventDefault();

        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        
        $("html, body").animate({ scrollTop: targetPosition - 50}, "slow")
    });

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    function changeText(){
        var windowWidth = $(window).width();
        if(windowWidth < 480){
            $('.navbar-brand').html('AFI');
        } else {
            $('.navbar-brand').html('AHMAD FAIDZAL IBRAHIM');
        }
    }
    $(window).on('resize', changeText);
    
});

