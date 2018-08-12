
(function() {
    var $ = jQuery;

    $.fn.plusGallery = function(options) {
        var $gallery = $(this);
        var maxPos;
        var curPos = 0;

        function getTotalWidth() {
            var totalWidth = 0;
            $gallery.find('figure').each(function() {
                totalWidth += parseInt($(this).width(), 10);
            });
            return totalWidth;
        }
        function getMaxPos() {
            return getTotalWidth()-$gallery.width();
        }

        function moveRight(slideRange) {
            totalWidth = getTotalWidth();
            maxPos = getMaxPos();
            if ((curPos+slideRange) <= maxPos) {
                curPos += slideRange;
            } else {
                curPos = maxPos;
                $(this).hide();
            }
            $('figure', $gallery).css('transform', 'translate(-'+curPos+'px, 0)');
        }
        
        function moveLeft(slideRange) {
            totalWidth = getTotalWidth();
            maxPos = totalWidth-slideRange;

            if ((curPos-slideRange) > 0) {
                curPos -= slideRange;
            } else {
                curPos = 0;
                $(this).hide();
            }
            $('figure', $gallery).css('transform', 'translate(-'+curPos+'px, 0)');
        }

        /* Set line-height of the buttons to img height, so arrows are vertical-aligned */
        $('.img-prev, .img-next').css('line-height', $('.img-slide img').height()+'px');

        /* If there are not enough pictures to fill the gallery
         * arrange them in the middle */
        if ($gallery.width() > getTotalWidth()) {
            var offset = ($gallery.width()-getTotalWidth())/2;
            var overlayPadding = parseInt($('.img-overlay').css('padding-left'), 10);
            $('figure', $gallery).css('transform', 'translate('+offset+'px, 0)');
            $('.img-overlay').width(getTotalWidth()-overlayPadding*2).css('left', offset+'px');
        }

        /* Mouse functions */
        $gallery.hover(function() {
            if (curPos > 0) {
                $('.img-prev').show('fast');
            }
            if (curPos < getMaxPos()) {
                $('.img-next').show('fast');
            }

        }, function() {
            $('.img-prev').hide('fast');
            $('.img-next').hide('fast');
        });
        $('.img-next').click(function() {
            moveRight($gallery.width());
            if (curPos > 0) {
                $('.img-prev').show('fast');
            }
            if (curPos >= getMaxPos()) {
                $(this).hide('fast');
            }
        });
        $('.img-prev').click(function() {
            moveLeft($gallery.width());
            if (curPos < getMaxPos()) {
                $('.img-next').show('fast');
            }
            if (curPos <= 0) {
                $(this).hide('fast');
            }
        });

        /* Touchfunctions */
        var touchX;
        $gallery.bind('touchstart mousedown', function(e) {
            console.log(e.type);
            e.preventDefault();
            touchX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        });
        var curX;
        $gallery.bind('touchmove mousemove', function(e) {
            curX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        });
        $gallery.bind('touchend mouseup', function(e) {
            range = curX-touchX;
            if (range < -50) {
                moveRight(-range);
            } else if (range > 50) {
                moveLeft(range);
            }
        });
    };
}).call(this);
