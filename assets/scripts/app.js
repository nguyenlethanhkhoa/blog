var app = {
    init: function() {
        this.initElementEvents();
    },
    initElementEvents: function() {
        $('.nav-side-menu .menu-content .sub-menu').click(function() {
            $.ajax({
                url: 'pages/framework-from-scratch/introduction.html',
                success: function(data) {
                    $('.content').html(data);
                }
            });
        });
    }
}