$(document).ready(function() {

    $('.hadouken').hide();
    $('.ryu-throwing').show();
    $('.ryu-throwing').hide();


    /**************
     * Mouse Events
     */
    $('.ryu').mouseenter(function() {
        $('.ryu-still').hide();
        $('.ryu-ready').show();
    });

    $('.ryu').mouseleave(function() {
        $('.ryu-ready').hide();
        $('.ryu-still').show();
    });

    $('.ryu').mousedown(function() {
        playHadouken();
        $('.ryu-ready').hide();
        $('.ryu-throwing').show();
        $('.hadouken').show()
        .animate(
            {'left': '300px'},
            500,
            function() {
                $(this).hide();
                $(this).css('left', '-212px');
            }
        );
    }) ;

    $('.ryu').mouseup(function() {
        $('.ryu-throwing').hide();
        $('.ryu-ready').show();

    });

    /**************
     * Key Events
     * 88 = x
     */

    $(document).keydown(function(e) {
        if(e.which == 88) {
            $('.ryu-still').hide();
            $('.ryu-ready').hide();
            $('.ryu-cool').show();
            $('.photographer').show();
        }
    });

    $(document).keyup( function(e) {
        if(e.which == 88) {
            $('.ryu-cool').hide();
            $('.photographer').hide();
            $('.ryu-still').show();
        }
    });
})

/**************
 * Audio
 */

function playHadouken () {
    $('#hadouken-sound')[0].volume = 0.5;
    $('#hadouken-sound')[0].load();
    $('#hadouken-sound')[0].play();
}