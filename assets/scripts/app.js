var app = {
	init: function() {
		const contentWidth = window.innerWidth - 240 - 50 - 50;
		const contentHeight = window.innerHeight;

		$(".scrollable").css({ width: contentWidth, height: contentHeight });
		$(".scrollable").TrackpadScrollEmulator();

		this.initElementEvents();
	},
	initElementEvents: function() {
		$(window).resize(function() {
			$(".scrollable").TrackpadScrollEmulator("recalculate");
		});

		$(".nav-side-menu .menu-content .sub-menu li a").click(function() {
			$(".nav-side-menu .menu-content .sub-menu li").removeClass("active");
			$(this)
				.parent()
				.addClass("active");

			let url = $(this).attr("href");
			url = url.substring(1, url.length);

			$.ajax({
				url: url,
				success: function(data) {
					$(".content").html(data);
				}
			});
		});
	},
	slide: function(className) {
		var slideNext = this.slideNext;
		var slideBack = this.slideBack;

		$("body").delegate(className, "focus", function() {
			$(this).data("focused", true);
			$(this)
				.find(".slider-item")
				.attr("data-current-slide", false)
				.hide();

			$(this)
				.find(".slider-item:nth-child(1)")
				.attr("data-current-slide", true)
				.fadeIn();
		});

		$("body").delegate(className, "blur", function() {
			$(this).data("focused", false);
		});

		$("body").delegate(className, "keyup", function(e) {
			if (!$(this).data("focused")) {
				return;
			}

			if (e.originalEvent.code == "ArrowLeft") {
				slideBack(className);
			}

			if (e.originalEvent.code == "ArrowRight") {
				slideNext(className);
			}
		});
	},
	slideNext: function(className) {
		var currentSlide =
			$(className)
				.find('.slider-item[data-current-slide="true"]')
				.index() + 1;

		var maxSlide = $(className).find(".slider-item").length;

		if (currentSlide === maxSlide) {
			return;
		}

		$(className)
			.find(".slider-item")
			.attr("data-current-slide", false)
			.hide();

		$(className)
			.find(".slider-item:nth-child(" + (currentSlide + 1) + ")")
			.attr("data-current-slide", true)
			.fadeIn();
	},
	slideBack: function(className) {
		var currentSlide =
			$(className)
				.find('.slider-item[data-current-slide="true"]')
				.index() + 1;

		var minSlide = 1;

		if (currentSlide === minSlide) {
			return;
		}

		$(className)
			.find(".slider-item")
			.attr("data-current-slide", false)
			.hide();

		$(className)
			.find(".slider-item:nth-child(" + (currentSlide - 1) + ")")
			.attr("data-current-slide", true)
			.fadeIn();
	}
};
