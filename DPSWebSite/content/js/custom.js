

/***************Home-page-youtube*************/
function onYouTubeIframeAPIReady() {
    var player;
    player = new YT.Player('yt-embed', { // Replaces the <div id="yt-embed"> with an iframe
        videoId: 'bpOSxM0rNPM', // Video ID
        width: 360, // Video width
        height: 600, // Video height
        playerVars: {

        },
        events: {
            onReady: function(e) {
                e.target.mute();
            }
        }
    });


}
/***************Home-page-youtube*************/

/***************home page background video*************/
var min_w = 300;
var vid_w_orig;
var vid_h_orig;

$(function() {

    vid_w_orig = parseInt($('video').attr('width'));
    vid_h_orig = parseInt($('video').attr('height'));

    $(window).resize(function () { fitVideo(); });
    $(window).trigger('resize');

});

function fitVideo() {

    $('#video-viewport').width($('.fullsize-video-bg').width());
    $('#video-viewport').height($('.fullsize-video-bg').height());

    var scale_h = $('.fullsize-video-bg').width() / vid_w_orig;
    var scale_v = $('.fullsize-video-bg').height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    $('video').width(scale * vid_w_orig);
    $('video').height(scale * vid_h_orig);

    $('#video-viewport').scrollLeft(($('video').width() - $('.fullsize-video-bg').width()) / 2);
    $('#video-viewport').scrollTop(($('video').height() - $('.fullsize-video-bg').height()) / 2);

};
