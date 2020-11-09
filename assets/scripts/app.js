var app = {
	init: function () {
		let url = window.location.href;
		let url_part = url.split('#')
		if (url_part.length == 2) {
			load_content(url_part[1])
		}

		this.initEvents();
	},
	initEvents: function() {
		$('body').delegate('abbr', 'click', function () {
			const internal_target = $(this).data('internal-target')

			let internal_target_element = $(`*[data-target="${internal_target}"]`)
			$('.content-container').animate({scrollTop: internal_target_element.offset().top}, 500); 
			
		});
	},
	slide: function (className) {
		var slideNext = this.slideNext;
		var slideBack = this.slideBack;

		$("body").delegate(className, "focus", function () {
			$(this).data("focused", true);
			$(this).find(".slider-item").attr("data-current-slide", false).hide();

			$(this).find(".slider-item:nth-child(1)").attr("data-current-slide", true).fadeIn();
		});

		$("body").delegate(className, "blur", function () {
			$(this).data("focused", false);
		});

		$("body").delegate(className, "keyup", function (e) {
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
		var currentSlide = $(className).find('.slider-item[data-current-slide="true"]').index() + 1;

		var maxSlide = $(className).find(".slider-item").length;

		if (currentSlide === maxSlide) {
			return;
		}

		$(className).find(".slider-item").attr("data-current-slide", false).hide();

		$(className)
			.find(".slider-item:nth-child(" + (currentSlide + 1) + ")")
			.attr("data-current-slide", true)
			.fadeIn();
	},
	slideBack: function(className) {
		var currentSlide = $(className).find('.slider-item[data-current-slide="true"]').index() + 1;

		var minSlide = 1;

		if (currentSlide === minSlide) {
			return;
		}

		$(className).find(".slider-item").attr("data-current-slide", false).hide();

		$(className)
			.find(".slider-item:nth-child(" + (currentSlide - 1) + ")")
			.attr("data-current-slide", true)
			.fadeIn();
	},
};

jQuery.fn.initMenu = function (opt) {
	if (typeof opt.items != "object") {
		throw Exception("items need to be an object");
	}

	const wrapper = $(document.createElement('ul')).appendTo(this);
	add_menu_items(wrapper, opt.items);
	$(this).find(".sub-nav").children("ul").slideUp(0);
	$(this).find(".item a").click(function() {

		wrapper.find(".active").removeClass("active");
		$(this).addClass("active");

		let url = $(this).attr("href");
		url = url.substring(1, url.length);
		load_content(url)
	});

	function add_menu_items(wrapper, items) {
		for (let key in items) {
			if (!items.hasOwnProperty(key)) {
				continue;
			}

			if (typeof items[key] == 'object') {
				const internal_wrapper = $(document.createElement("ul"));

				const item = $(document.createElement("a"));
				item.html(`<span>${key}</span>`);
				item.attr("href", "#");

				$(document.createElement("li"))
					.addClass("sub-nav")
					.append(item)
					.append(internal_wrapper)
					.appendTo(wrapper);

				add_menu_items(internal_wrapper, items[key]);

			} else {
				const item = $(document.createElement("a"));
				item.html(`<span>${key}</span>`);
				item.attr("href", items[key]);

				$(document.createElement("li"))
					.addClass('item')
					.append(item)
					.appendTo(wrapper);
			}
		}
	}
};


const load_content = (url) => {

	$.ajax({
		url: url,
		success: function (data) {
			$(".content").html(data);
		},
	});
}



