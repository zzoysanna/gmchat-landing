$(document).ready(function() {
	
	checkScroll();
	$(".heading").addClass("active");
	document.getElementById("video").play();

	var scrollOffset = -200;
	if (window.innerHeight <= 768) {
		scrollOffset = -80;
	}
	if (window.innerWidth < 400) {
		scrollOffset = -56;
	}


	$(".menu-link").click(function() {
		if ($("body").hasClass("body--noscroll")) {
			closeMobileMenu();
		}
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + scrollOffset/2 + "px"
		}, {
			duration: 500,
			easing: "swing"
		});
		return false;
	});
	

	$(document).scroll(function() {
		checkScroll();
	});
	$( window ).resize(function() {
		if (window.innerHeight <= 768) {
			scrollOffset = -80;
		}
		if (window.innerWidth < 400) {
			scrollOffset = -56;
		}
	});	

	$(".mobmenu-btn").click(function() {
		scrollDisable();
		$(".mobmenu").addClass("mobmenu--open");
	});
	$(".mobmenu-close").click(function() {
		closeMobileMenu();
	});
	$(document).click(function(e){
		if (!$("body").hasClass("body--noscroll")) {
			return false;
		}
		var mobmenu = $(".mobmenu");
		var popup = $(".popup");
		var popupBtn = $(".popup-btn");
		var mobmenuBtn = $(".mobmenu-btn");
		if (mobmenu.hasClass("mobmenu--open") && 
			!mobmenu.is(e.target) && 
			!mobmenuBtn.is(e.target) && 
			mobmenu.has(e.target).length === 0) {
			closeMobileMenu();
		}
		if (popup.hasClass("popup--shown") && 
			!popup.is(e.target) && 
			!popupBtn.is(e.target) && 
			popup.has(e.target).length === 0) {
			popup.removeClass("popup--shown");
			scrollEnable();
		}
	});

	$(".popup-btn").click(function(){
		scrollDisable();
		$(".popup").addClass("popup--shown");
		if ($(".mobmenu").hasClass("mobmenu--open")) {
			$(".mobmenu").removeClass("mobmenu--open");
		}
	});
	$(".popup-close").click(function(){
		$(".popup").removeClass("popup--shown");
		scrollEnable();
	})

	$(".themes-item").click(function(){
		$(this).parent().find(".themes-item--active").removeClass("themes-item--active");
		$(this).addClass("themes-item--active");
		let text = $(this).text();
		var frameUrl = $(this).attr("data-url");
		var frame = $("#themes-frame");
		var newUrl = frame.attr("src").slice(0, frame.attr("src").lastIndexOf("/") + 1) + frameUrl;
		$(".themes-current").text(text);
		$(frame).attr("src", newUrl);
	});
	$(".themes-select").click(function() {
		$(this).toggleClass("themes-select--open");
	});


	function checkScroll() {
		var	topPosition = window.pageYOffset;
		var header = $(".heading-top");
		var blocks = $(".block");
		for (var i = 0; i < blocks.length; i++) {
			if (topPosition - scrollOffset >= $(blocks[i]).offset().top) {
				$(blocks[i]).addClass("active");
			}
		}		
		if (topPosition > 100) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}

	}
	function closeMobileMenu() {
		scrollEnable();
		$(".mobmenu").removeClass("mobmenu--open");
	}
	function scrollDisable() {
		$("body").addClass("body--noscroll");
	}
	function scrollEnable() {
		$("body").removeClass("body--noscroll");
	}
});
