$(document).ready(function() {
    var video = '<div class="video"><iframe width="800" height="450" src="https://www.youtube.com/embed/zL5_EsF06DM?rel=0&amp;showinfo=0&autoplay=1&start=624" frameborder="0" allowfullscreen></iframe></div>'
    $('img.hz-video, div.play-button').click(function() {
        $(this).parent().html(video);
    });
    // $('form[name=hz-developer-preview]').validate({
    //     rules: { email: { email: true } },
    //     submitHandler: function(form) { form.submit(); }
    // });



    // Blog right panel should be set to a fixed position on scroll
    var $sidebar = $('.blog-sidebar-container')
    if ($sidebar.length > 0) {
        var blog_sidebar_sticky = new Waypoint.Sticky({
            element: $sidebar
        });
        blog_sidebar_github = new Waypoint({
            element: $sidebar,
            handler: function(direction) {
                // Delay the popup animation
                setTimeout(function() {
                    $('.github-star .popup', $sidebar).removeClass('hidden')
                }, 2000)
            }
        });
    }
});
