
/*	Determine if Click or Tap
---------------------------------------------------------------------- */
	var ua = navigator.userAgent,
    	click = (ua.match(/iPad/i) || ua.match(/iPhone/i) || ua.match(/Android/i)) ? "touchstart" : "click";

	//$(document).on('click', function(e) {
	//	if ( 
	//		!$(e.target).is('a.cartBtn') && 
	//		!$(e.target).is('a.menuBtn') && 
	//		$(e.target).closest('div.cart').length == 0 &&
	//		$(e.target).closest('div.menu').length == 0
	//	){
	//		closeCart();
	//		closeMenu();
	//	}
	//});


/*	Open & Close Cart and Menu
---------------------------------------------------------------------- */

	// Click Cart Icon	
	//
	$('a.cartBtn').on(click, function(e){
		e.preventDefault();
		//e.stopPropagation();
		if( $('.wrap').hasClass('cart-open') ){
			closeCart();
		} else {
			openCart();
		}
	});
	function openCart(){
		closeMenu();
		$('div.menu').hide();
		$('div.cart').show();
		$('.wrap').addClass('cart-open');
		setTimeout(function(){
			$('div.cart').css('z-index', 200);
		}, 300);
	}
	function closeCart(){
		$('div.cart').css('z-index', -100);
		$('div.menu').css('z-index', -200);
		$('.wrap').removeClass('cart-open');
	}
	
	// Click Menu Icon	
	//
	$('a.menuBtn').on(click, function(e){
		e.preventDefault();
		//e.stopPropagation();
		if( $('.wrap').hasClass('menu-open') ){
			closeMenu();
		} else {
			openMenu();
		}
	});
	function openMenu(){
		closeCart();
		$('div.cart').hide();
		$('div.menu').show();
		$('.wrap').addClass('menu-open');
		setTimeout(function(){
			$('div.menu').css('z-index', 200);
		}, 300);
	}
	function closeMenu(){
		$('div.menu').css('z-index', -100);
		$('div.cart').css('z-index', -200);
		$('.wrap').removeClass('menu-open');
	}



	

	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	