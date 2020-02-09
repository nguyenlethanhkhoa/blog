var app = {
    init: function() {

        const contentWidth = window.innerWidth - 240 - 50 -50;
        const contentHeight = window.innerHeight;
        
        $('.scrollable').css({width: contentWidth, height: contentHeight});
        $('.scrollable').TrackpadScrollEmulator();

        this.initElementEvents();
    },
    initElementEvents: function() {

        $(window).resize(function() {
            $('.scrollable').TrackpadScrollEmulator('recalculate');
        });

        $('.nav-side-menu .menu-content .sub-menu li a').click(function() {

            $('.nav-side-menu .menu-content .sub-menu li').removeClass('active');
            $(this).parent().addClass('active');

            let url = $(this).attr('href');
            url = url.substring(1, url.length);
            
            $.ajax({
                url: url,
                success: function(data) {
                    $('.content').html(data);
                }
            });
        });
    }
}