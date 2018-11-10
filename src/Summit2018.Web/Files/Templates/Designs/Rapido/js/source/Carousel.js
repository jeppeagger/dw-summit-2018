var Carousel = function () { }

Carousel.prototype.Init = function () {
    //get all images need to be added to galleries
    var carousels = document.querySelectorAll('.js-carousel-container');
    var t = this;
    t.carousels = {};
    //create virtual galleries
    carousels.forEach(function (carousel) {
        var carouselData = carousel.getElementsByClassName('js-carousel-data')[0];
        if (!carouselData) {
            return;
        }
        var currentSlide = 0;
        var totalSlides = carousel.firstElementChild.childElementCount;
        var direction = carouselData.getAttribute("data-direction") || "horizontal";
        var slidingType = carouselData.getAttribute("data-sliding-type") || "full";
        var slideHeight = carousel.firstElementChild.offsetHeight / totalSlides;
        var slideWidth = carousel.firstElementChild.firstElementChild.offsetWidth;
        var slidesInView = parseInt(carouselData.getAttribute("data-slides-in-view")) || 5;
        var slidesPerClick = parseInt(carouselData.getAttribute("data-slides-per-click")) || 1;
        var slidesLeft = totalSlides - slidesInView + slidesPerClick;
        var slideTime = carouselData.getAttribute("data-carousel-slide-time") || 0;
        var slideTimer;

        if (direction == "vertical") {
            carousel.firstElementChild.style.top = 0;
            carousel.style.height = slidesInView * slideHeight + "px";
            carousel.classList.remove("carousel--hidden");
        } else {
            carousel.firstElementChild.style.left = 0;
        }

        if (totalSlides > 1 && slideTime > 0) {
            slideTimer = setInterval(function () {
                Carousel.GetNextSlide(carousel.id);
            }, slideTime * 1000);
        }

        if (totalSlides <= 1 || totalSlides <= slidesInView) {
            carouselData.classList.add("u-hidden");
        }

        t.carousels[carousel.id] = {
            currentSlide  : currentSlide,
            totalSlides   : totalSlides,
            direction     : direction,
            slidingType   : slidingType,
            slideHeight   : slideHeight,
            slideWidth    : slideWidth,
            slidesInView  : slidesInView,
            slidesPerClick: slidesPerClick,
            slidesLeft    : slidesLeft,
            slideTime     : slideTime,
            slideTimer    : slideTimer
        };

        var event = new CustomEvent('initSlideShow', { 'detail': { 'currentTarget': carousel, 'currentSlide': currentSlide, 'totalSlides': totalSlides, 'direction': direction, "slidingType": slidingType } });

        if (bLazy != null) {
            bLazy.revalidate();
        }

        carousel.dispatchEvent(event);
        document.dispatchEvent(event);
    });
}


Carousel.prototype.GetPreviousSlide = function (key, stopTimer) {
    var carousel = this.carousels[key];
    if (stopTimer) {
        clearTimeout(carousel.slideTimer);
    }
    carousel.currentSlide = (carousel.currentSlide + carousel.slidesLeft - carousel.slidesPerClick) % carousel.slidesLeft;
    Carousel.ShiftSlide(key);
}

Carousel.prototype.GetNextSlide = function (key, stopTimer) {
    var carousel = this.carousels[key];
    if (stopTimer) {
        clearTimeout(carousel.slideTimer);
    }
    carousel.currentSlide = (carousel.currentSlide + carousel.slidesPerClick) % carousel.slidesLeft;
    Carousel.ShiftSlide(key);
}

Carousel.prototype.GoToSlide = function (key, number) {
    var carousel = this.carousels[key];
    clearTimeout(carousel.slideTimer);
    carousel.currentSlide = number;
    Carousel.ShiftSlide(key);
}

Carousel.prototype.ShiftSlide = function (key) {
    var carouselContainer = document.getElementById(key);
    var carousel = this.carousels[key];

    if (carousel.direction == "vertical") {
        if (carousel.slidingType == "items") {
            carouselContainer.firstElementChild.style.top = -(carousel.currentSlide * carousel.slideHeight) + "px";
        } else {
            carouselContainer.firstElementChild.style.top = -(carousel.currentSlide * 100) + "%";
        }
    } else {
        if (carousel.slidingType == "items") {
            carouselContainer.firstElementChild.style.left = -(carousel.currentSlide * carousel.slideWidth) + "px";
        } else {
            carouselContainer.firstElementChild.style.left = -(carousel.currentSlide * 100) + "%";
        }
    }

    var currentSlideElement = carouselContainer.getElementsByClassName("carousel__container__slide")[carousel.currentSlide];

    var event = new CustomEvent('shiftSlide', { 'detail': { 'currentTarget': carouselContainer, 'currentSlide': carousel.currentSlide, 'currentSlideElement': currentSlideElement, 'totalSlides': carousel.totalSlides } });

    carouselContainer.dispatchEvent(event);
    document.dispatchEvent(event);
}

var Carousel = new Carousel();

window.addEventListener("load", function () {
    document.querySelectorAll(".js-remove-after-load").forEach(function (el) {
        el.remove();
    });
    Carousel.Init();
});