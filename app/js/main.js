// Simple Slider Script (c)2013 John Davenport Scheuer
// as first seen in http://www.dynamicdrive.com/forums/
// username: jscheuer1 - This Notice Must Remain for Legal Use
jQuery(function($){
	var totWidth = 0, mouseisover, pause = 3000, resume = 1000;
		$('#home-slider .slide').each(function(i, s){
			totWidth += $(s).data('index', i).addClass('index' + i).width();
	});

	var $o = $('#banner-wrapper').add('.slide_menu li a').hover(function(){mouseisover = true;}, function(){mouseisover = false;}).end();
	var $in = jQuery('#home-slider').width(totWidth);

	function scroll(reorder){
		clearTimeout(timer);
		if(mouseisover){
			timer = setTimeout(scroll, resume);
			return;
		}
		$('.menuItem.active').removeClass('active').addClass('inactive');
		$('.menuItem').eq($('.slide', $o).eq(1).data('index')).removeClass('inactive').addClass('active');

		$o.animate({scrollLeft: '+=' + $('.slide', $o).eq(0).width()}, 1000, function(){
			$in.append($('.slide', $o).removeClass('current').eq(0));
			$o.scrollLeft(0);
			$('.slide', $o).eq(0).addClass('current');
			reorder === true && restoreorder();
			timer = setTimeout(scroll, pause);
		});
	}

	var timer = setTimeout(scroll, pause);
	function restoreorder(){
			var $s = $('.slide', $o), l = $s.length, firsti = $s.eq(0).data('index'), i = 0;
			while (++i < l) {
			targi = (++firsti) % l;
			if($('.slide', $o).eq(i).data('index') !== targi){
			$('.slide', $o).eq(i).before($('.slide', $o).filter('.index' + targi));
			}
		}
	}

	$('.menuItem a').click(function(e){
			var i = $(this).parent().index();
			if($('.slide', $o).eq(0).data('index') !== i){
				mouseisover = false;
				clearTimeout(timer);
				$o.stop(true, true);
			if($('.slide', $o).eq(1).data('index') !== i){
				$('.slide', $o).eq(0).after($('.slide', $o).filter('.index' + i));
			}
			scroll(true);
		}
		e.preventDefault();
	});

});