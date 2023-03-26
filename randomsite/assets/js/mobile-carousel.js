$(document).ready((function($) {
    var excuted = !0;
    function startCarousel(carouselName, dotContainerName) {
        var carouselItems;
        $(carouselName + " .carousel").children("li").each((function() {
            var container = $(this);
            function nextHandler(event) {
                event.preventDefault();
                var wrapper = container.find(".carousel-boundaries");
                if (wrapper.find(".selected").is(":last-child")) {
                    var selectedPosition = container.find(".carousel-boundaries .selected").index() - (wrapper.children("li").length - 1);
                    prevSlide(container, carouselDots, selectedPosition)
                } else
                    nextSlide(container, carouselDots)
            }
            function prevHandler(event) {
                event.preventDefault();
                var wrapper = container.find(".carousel-boundaries");
                if (wrapper.find(".selected").is(":first-child")) {
                    var selectedPosition = container.find(".carousel-boundaries .selected").index() + (wrapper.children("li").length - 1);
                    nextSlide(container, carouselDots, selectedPosition)
                } else
                    prevSlide(container, carouselDots)
            }
            function createSliderDots(container, dotContainerName) {
                var dotsWrapper = $('<ol class="carousel-selector" id=' + dotContainerName + "></ol>").insertAfter(container.children("a"));
                return container.find(".carousel-boundaries li").each((function(index) {
                    var dotWrapper = $(0 == index ? '<li class="selected"></li>' : "<li></li>")
                      , dot = $('<a href="#0"></a>').appendTo(dotWrapper);
                    dotWrapper.appendTo(dotsWrapper),
                    dot.text(index + 1)
                }
                )),
                dotsWrapper.children("li")
            }
            function nextSlide(container, carouselDots, n) {
                var visibleSlide = container.find(".carousel-boundaries .selected")
                  , navigationDot = container.find(".carousel-selector .selected");
                void 0 === n && (n = visibleSlide.index() + 1),
                visibleSlide.removeClass("selected"),
                container.find(".carousel-boundaries li").eq(n).removeClass().addClass("selected").prevAll().removeClass().addClass("hide-left").end().prev().removeClass("hide-left").addClass("move-left").end().nextAll().removeClass().addClass("hide-right").end().next().removeClass("hide-right").addClass("move-right"),
                navigationDot.removeClass("selected"),
                $("#" + dotContainerName + " li").eq(n).addClass("selected")
            }
            function prevSlide(container, carouselDots, n) {
                var visibleSlide = container.find(".carousel-boundaries .selected")
                  , navigationDot = container.find(".carousel-selector .selected");
                void 0 === n && (n = visibleSlide.index() - 1),
                visibleSlide.removeClass("selected focus-on-left"),
                container.find(".carousel-boundaries li").eq(n).removeClass().addClass("selected").nextAll().removeClass().addClass("hide-right").end().next().removeClass().addClass("move-right").end().prevAll().removeClass().addClass("hide-left").end().prev().removeClass("hide-left").addClass("move-left"),
                navigationDot.removeClass("selected"),
                $("#" + dotContainerName + " li").eq(n).addClass("selected")
            }
            function hoverItem(item, bool) {
                item.hasClass("move-right") ? item.toggleClass("hover", bool).siblings(".selected, .move-left").toggleClass("focus-on-right", bool) : item.toggleClass("hover", bool).siblings(".selected, .move-right").toggleClass("focus-on-left", bool)
            }
            carouselDots = createSliderDots(container, dotContainerName),
            container.on("click", ".move-right, .move-left", (function(event) {
                var selectedPosition;
                event.preventDefault(),
                $(this).hasClass("move-right") ? (selectedPosition = container.find(".carousel-boundaries .selected").index() + 1,
                nextSlide(container, carouselDots, selectedPosition)) : (selectedPosition = container.find(".carousel-boundaries .selected").index() - 1,
                prevSlide(container, carouselDots, selectedPosition))
            }
            )),
            container.find(".carousel-boundaries").on("swipeleft", (function(event) {
                var wrapper;
                event.preventDefault(),
                $(this).find(".selected").is(":last-child") ? prevSlide(container, carouselDots, 0) : nextSlide(container, carouselDots)
            }
            )),
            container.find(".carousel-boundaries").on("swiperight", (function(event) {
                event.preventDefault();
                var wrapper = $(this);
                wrapper.find(".selected").is(":first-child") ? nextSlide(container, carouselDots, wrapper.children("li").length - 1) : prevSlide(container, carouselDots)
            }
            )),
            container.on("mouseover", ".move-right, .move-left", (function(event) {
                event.preventDefault(),
                hoverItem($(this), !0)
            }
            )),
            container.on("mouseleave", ".move-right, .move-left", (function(event) {
                event.preventDefault(),
                hoverItem($(this), !1)
            }
            )),
            container.parent().siblings(carouselName + " .next").on("click", (function(event) {
                nextHandler(event)
            }
            )),
            container.parent().siblings(carouselName + " .prev").on("click", (function(event) {
                prevHandler(event)
            }
            )),
            carouselDots.on("click", (function() {
                var selectedDot = $(this);
                if (!selectedDot.hasClass("selected")) {
                    var selectedPosition = selectedDot.index(), activePosition;
                    container.find("#" + dotContainerName + ".carousel-boundaries .selected").index() < selectedPosition ? nextSlide(container, carouselDots, selectedPosition) : prevSlide(container, carouselDots, selectedPosition)
                }
            }
            )),
            $("a#carousel-ext").on("click touchstart touchend", (function(event) {
                event.preventDefault()
            }
            ))
        }
        ))
    }
    excuted && (setTimeout((function() {
        startCarousel("#reviews", "reviews-ratings-dots"),
        startCarousel("#reviews-rating-mobile", "reviews-ratings-mobile-dots")
    }
    ), 100),
    excuted = !1)
}
));
