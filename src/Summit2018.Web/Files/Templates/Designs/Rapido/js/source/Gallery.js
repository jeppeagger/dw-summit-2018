var Gallery = function () { }

Gallery.prototype.Init = function () {
    //get all images need to be added to galleries
    var imagesNodes = document.querySelectorAll('.js-gallery');
    var thisGallery = this;
    this.images = {};
    //create virtual galleries
    imagesNodes.forEach(function (image) {
        var dataFor = image.getAttribute('data-for');
        if (!thisGallery.images.hasOwnProperty(dataFor)) {
            thisGallery.images[dataFor] = [];
        }
        thisGallery.images[dataFor].push(image);
    });
    //active prev/next buttons
    for (var key in thisGallery.images) {
        if (thisGallery.images.hasOwnProperty(key) && thisGallery.images[key].length > 1) {
            var prevBtn = document.getElementById(key + '_prev');
            var nextBtn = document.getElementById(key + '_next');
            if (prevBtn) {
                prevBtn.classList.remove('u-hidden');
            }
            if (nextBtn) {
                nextBtn.classList.remove('u-hidden');
            }
        }
    }
}

Gallery.prototype.openImage = function (thumb) {
    var key = thumb.getAttribute('data-for');
    var gallery = this.images[key];
    this.current = gallery.indexOf(thumb);
    this.setCurrentImage(key);
}

Gallery.prototype.openImageByNum = function (thumb) {
    var key = thumb.getAttribute('data-for');
    var number = parseInt(thumb.getAttribute('data-number'));
    this.current = number;
    this.setCurrentImage(key);
}

Gallery.prototype.nextImage = function (key) {
    var gallery = this.images[key];
    this.current = (this.current + 1) % gallery.length;
    this.setCurrentImage(key);
}

Gallery.prototype.prevImage = function (key) {
    var gallery = this.images[key];
    this.current = (this.current + gallery.length - 1) % gallery.length;
    this.setCurrentImage(key);
}

Gallery.prototype.setCurrentImage = function (key) {
    var gallery = this.images[key];
    //thumbs
    if (gallery[this.current].classList.contains('js-thumb')) {
        var active = document.querySelector('.js-thumb.js-thumb--active[data-for=' + key + ']');
        if (active) {
            active.classList.remove('thumb-list__item--active');
            active.classList.remove('js-thumb--active');
        }
        gallery[this.current].classList.add('thumb-list__item--active');
        gallery[this.current].classList.add('js-thumb--active');
    }
    //counter
    var counter = document.getElementById(key + '_counter');
    if (counter) {
        counter.innerText = parseInt(this.current) + 1 + ' / ' + gallery.length;
    }
    document.getElementById(key).setAttribute("data-number", this.current);
    document.getElementById(key).src = gallery[this.current].getAttribute('data-image');
}

var Gallery = new Gallery();

document.addEventListener("DOMContentLoaded", function (event) {
    Gallery.Init();
});