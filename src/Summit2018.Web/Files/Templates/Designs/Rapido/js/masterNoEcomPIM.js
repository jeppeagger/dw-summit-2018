/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function (q, m) { "function" === typeof define && define.amd ? define(m) : "object" === typeof exports ? module.exports = m() : q.Blazy = m() })(this, function () { function q(b) { var c = b._util; c.elements = E(b.options); c.count = c.elements.length; c.destroyed && (c.destroyed = !1, b.options.container && l(b.options.container, function (a) { n(a, "scroll", c.validateT) }), n(window, "resize", c.saveViewportOffsetT), n(window, "resize", c.validateT), n(window, "scroll", c.validateT)); m(b) } function m(b) { for (var c = b._util, a = 0; a < c.count; a++) { var d = c.elements[a], e; a: { var g = d; e = b.options; var p = g.getBoundingClientRect(); if (e.container && y && (g = g.closest(e.containerClass))) { g = g.getBoundingClientRect(); e = r(g, f) ? r(p, { top: g.top - e.offset, right: g.right + e.offset, bottom: g.bottom + e.offset, left: g.left - e.offset }) : !1; break a } e = r(p, f) } if (e || t(d, b.options.successClass)) b.load(d), c.elements.splice(a, 1), c.count--, a-- } 0 === c.count && b.destroy() } function r(b, c) { return b.right >= c.left && b.bottom >= c.top && b.left <= c.right && b.top <= c.bottom } function z(b, c, a) { if (!t(b, a.successClass) && (c || a.loadInvisible || 0 < b.offsetWidth && 0 < b.offsetHeight)) if (c = b.getAttribute(u) || b.getAttribute(a.src)) { c = c.split(a.separator); var d = c[A && 1 < c.length ? 1 : 0], e = b.getAttribute(a.srcset), g = "img" === b.nodeName.toLowerCase(), p = (c = b.parentNode) && "picture" === c.nodeName.toLowerCase(); if (g || void 0 === b.src) { var h = new Image, w = function () { a.error && a.error(b, "invalid"); v(b, a.errorClass); k(h, "error", w); k(h, "load", f) }, f = function () { g ? p || B(b, d, e) : b.style.backgroundImage = 'url("' + d + '")'; x(b, a); k(h, "load", f); k(h, "error", w) }; p && (h = b, l(c.getElementsByTagName("source"), function (b) { var c = a.srcset, e = b.getAttribute(c); e && (b.setAttribute("srcset", e), b.removeAttribute(c)) })); n(h, "error", w); n(h, "load", f); B(h, d, e) } else b.src = d, x(b, a) } else "video" === b.nodeName.toLowerCase() ? (l(b.getElementsByTagName("source"), function (b) { var c = a.src, e = b.getAttribute(c); e && (b.setAttribute("src", e), b.removeAttribute(c)) }), b.load(), x(b, a)) : (a.error && a.error(b, "missing"), v(b, a.errorClass)) } function x(b, c) { v(b, c.successClass); c.success && c.success(b); b.removeAttribute(c.src); b.removeAttribute(c.srcset); l(c.breakpoints, function (a) { b.removeAttribute(a.src) }) } function B(b, c, a) { a && b.setAttribute("srcset", a); b.src = c } function t(b, c) { return -1 !== (" " + b.className + " ").indexOf(" " + c + " ") } function v(b, c) { t(b, c) || (b.className += " " + c) } function E(b) { var c = []; b = b.root.querySelectorAll(b.selector); for (var a = b.length; a--; c.unshift(b[a])); return c } function C(b) { f.bottom = (window.innerHeight || document.documentElement.clientHeight) + b; f.right = (window.innerWidth || document.documentElement.clientWidth) + b } function n(b, c, a) { b.attachEvent ? b.attachEvent && b.attachEvent("on" + c, a) : b.addEventListener(c, a, { capture: !1, passive: !0 }) } function k(b, c, a) { b.detachEvent ? b.detachEvent && b.detachEvent("on" + c, a) : b.removeEventListener(c, a, { capture: !1, passive: !0 }) } function l(b, c) { if (b && c) for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d) ; d++); } function D(b, c, a) { var d = 0; return function () { var e = +new Date; e - d < c || (d = e, b.apply(a, arguments)) } } var u, f, A, y; return function (b) { if (!document.querySelectorAll) { var c = document.createStyleSheet(); document.querySelectorAll = function (a, b, d, h, f) { f = document.all; b = []; a = a.replace(/\[for\b/gi, "[htmlFor").split(","); for (d = a.length; d--;) { c.addRule(a[d], "k:v"); for (h = f.length; h--;) f[h].currentStyle.k && b.push(f[h]); c.removeRule(0) } return b } } var a = this, d = a._util = {}; d.elements = []; d.destroyed = !0; a.options = b || {}; a.options.error = a.options.error || !1; a.options.offset = a.options.offset || 100; a.options.root = a.options.root || document; a.options.success = a.options.success || !1; a.options.selector = a.options.selector || ".b-lazy"; a.options.separator = a.options.separator || "|"; a.options.containerClass = a.options.container; a.options.container = a.options.containerClass ? document.querySelectorAll(a.options.containerClass) : !1; a.options.errorClass = a.options.errorClass || "b-error"; a.options.breakpoints = a.options.breakpoints || !1; a.options.loadInvisible = a.options.loadInvisible || !1; a.options.successClass = a.options.successClass || "b-loaded"; a.options.validateDelay = a.options.validateDelay || 25; a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50; a.options.srcset = a.options.srcset || "data-srcset"; a.options.src = u = a.options.src || "data-src"; y = Element.prototype.closest; A = 1 < window.devicePixelRatio; f = {}; f.top = 0 - a.options.offset; f.left = 0 - a.options.offset; a.revalidate = function () { q(a) }; a.load = function (a, b) { var c = this.options; void 0 === a.length ? z(a, b, c) : l(a, function (a) { z(a, b, c) }) }; a.destroy = function () { var a = this._util; this.options.container && l(this.options.container, function (b) { k(b, "scroll", a.validateT) }); k(window, "scroll", a.validateT); k(window, "resize", a.validateT); k(window, "resize", a.saveViewportOffsetT); a.count = 0; a.elements.length = 0; a.destroyed = !0 }; d.validateT = D(function () { m(a) }, a.options.validateDelay, a); d.saveViewportOffsetT = D(function () { C(a.options.offset) }, a.options.saveViewportOffsetDelay, a); C(a.options.offset); l(a.options.breakpoints, function (a) { if (a.width >= window.screen.width) return u = a.src, !1 }); setTimeout(function () { q(a) }) } });


//Our initializer
var bLazy = new Blazy({
    breakpoints: [{
        width: 420 // Max-width
      , loadInvisible: true
      , src: 'data-src-small'
    }],
    success: function (e) {
        var thisImage = e;
        var mainFilter = thisImage.closest(".js-main-image-filter");

        if (mainFilter != null) {
            mainFilter.style.width = thisImage.clientWidth + "px";
        }
    }
});
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
var cartId;
var productsCount = -1;

var Cart = function () { }

Cart.prototype.InitMiniCart = function () {
    var miniCart = document.getElementsByClassName('js-mini-cart')[0];

    if (miniCart) {
        cartId = miniCart.getAttribute('data-cart-id');
    }

    window.onscroll = function () { Cart.toggleFloatingVisibility() };
}

document.addEventListener("DOMContentLoaded", function (event) {
    Cart.InitMiniCart();
});

Cart.prototype.toggleFloatingVisibility = function (e) {
    if (document.getElementById("FloatingMiniCart")) {
        var topHeight = document.getElementById("Top").clientHeight;
        var floatingMiniCart = document.getElementById("FloatingMiniCart");

        if (document.body.scrollTop > topHeight || document.documentElement.scrollTop > topHeight) {
            floatingMiniCart.classList.remove("u-hidden");
        } else {
            floatingMiniCart.classList.add("u-hidden");
        }
    }
}

Cart.prototype.EmptyCart = function(e) {
    e.preventDefault();

    var url = "/Default.aspx?ID=" + cartId;
    Cart.UpdateCart('miniCart', url, "cartcmd=emptycart", true);
    
    var miniCartDropdowns = document.getElementsByClassName("js-mini-cart");
    for (var i = 0; i < miniCartDropdowns.length; i++) {
        miniCartDropdowns[i].innerHTML = "";

        var event = new CustomEvent('emptyCart');
        document.dispatchEvent(event);
    } 
}

Cart.prototype.AddToCart = function (argOne, argTwo, argThree, argFour, argFive, argSix) {
    if (arguments.length === 2) {
        Cart.AddToCartByObject(argOne, argTwo);
    } else {
        Cart.AddToCartByProperties(argOne, argTwo, argThree, argFour, argFive, argSix);
    }  
}

Cart.prototype.AddToCartByProperties = function (e, productId, quantity, unitElement, variantElement, buyForPoints) {
    var cartItem = {
        id: productId
    };
    if (unitElement && document.getElementById(unitElement)) {
        cartItem.unitId = document.getElementById(unitElement).value;
    }
    if (variantElement && document.getElementById(variantElement)) {
        cartItem.variantId = document.getElementById(variantElement).value;
    }
    if (buyForPoints) {
        cartItem.buyForPoints = buyForPoints;
    }
    Cart.AddToCartByObject(e, cartItem);
}

Cart.prototype.AddToCartByObject = function (e, cartItem) {
    e.preventDefault();
    if (cartItem.quantity <= 0) {
        return;
    }

    var clickedButton = e.currentTarget;
    clickedButton.classList.add("u-position-relative");
    for (var i = 0; i < clickedButton.children.length; i++) {
        clickedButton.children[i].classList.add("u-visibility-hidden");
    };
    clickedButton.classList.add("disabled");
    clickedButton.disabled = true;
    var spinner = document.createElement("i");
    spinner.className = "fas fa-circle-notch fa-spin btn-spinner";
    clickedButton.appendChild(spinner);

    setTimeout(function () {
        clickedButton.classList.remove("u-position-relative");
        for (var i = 0; i < clickedButton.children.length; i++) {
            clickedButton.children[i].classList.remove("u-visibility-hidden");
        };
        clickedButton.classList.remove("disabled");
        clickedButton.disabled = false;
        clickedButton.removeChild(spinner);
    },
        1000);

    var url = "/Default.aspx?ID=" + cartId;
    url += "&Quantity=" + cartItem.quantity;
    url += "&redirect=false";
    url += "&ProductID=" + cartItem.id;
    if (cartItem.unitId) {
        url += "&UnitID=" + cartItem.unitId;
    }
    if (cartItem.variantId) {
        url += "&VariantID=" + cartItem.variantId;
    }
    var event = new CustomEvent('addToCart', { 'detail': cartItem });
    document.dispatchEvent(event);

    Cart.UpdateCart('miniCart', url, cartItem.buyForPoints ? "cartcmd=addWithPoints" : "cartcmd=add", false);
}

Cart.prototype.UpdateCart = function (containerId, url, command, preloader) {
    if (!containerId) {
        console.log("Cart: The container does not exist");
        return;
    }

    if (preloader == true) {
        var overlayElement = document.createElement('div');
        overlayElement.className = "preloader-overlay";
        overlayElement.setAttribute('id', "CartOverlay");
        var overlayElementIcon = document.createElement('div');
        overlayElementIcon.className = "preloader-overlay__icon dw-mod";
        overlayElementIcon.style.top = window.pageYOffset + "px";
        overlayElement.appendChild(overlayElementIcon);

        document.getElementById('content').parentNode.insertBefore(overlayElement, document.getElementById('content'));
    }

    var miniCartButtons = document.getElementsByClassName("js-mini-cart-button");
    for (var i = 0; i < miniCartButtons.length; i++) {
        var cartButton = document.getElementsByClassName("js-mini-cart-button")[i];
        cartButton.classList.add("mini-cart-update");
    }

    var queryParams = new QueryArray(url);
    queryParams.combineWithParams(command);
    queryParams.setValue("feedtype", "Counter");

    Request.Fetch().get(queryParams.getFullUrl(), updateSuccess, updateFailed);

    function updateSuccess(data) {
        if (preloader == true) {
            var overlayNode = document.getElementById('CartOverlay');
            overlayNode.parentNode.removeChild(overlayNode);
        }

        if (document.getElementById(containerId) && containerId != "miniCart") {
            HandlebarsBolt.UpdateContent(containerId, url);
        }

        var miniCartCounters = document.getElementsByClassName("js-mini-cart-counter");
        var dataObject = "";
        for (var i = 0; i < miniCartCounters.length; i++) {
            var cartCounter = miniCartCounters[i];

            if (cartCounter) {
                cartCounter.innerHTML = "";
                dataObject = data;

                var miniCartButtons = document.getElementsByClassName("js-mini-cart-button");
                for (var i = 0; i < miniCartButtons.length; i++) {
                    var cartButton = document.getElementsByClassName("js-mini-cart-button")[i];
                    cartButton.classList.remove("mini-cart-update");
                }

                HandlebarsBolt.CreateItemsFromJson(dataObject, cartCounter.getAttribute("id"));
            }
        }

        var event = new CustomEvent('cartUpdated', { 'detail': { "command": command, "containerId": containerId, "url": url, "preloader": preloader, "data": dataObject } });
        document.dispatchEvent(event);
    }

    function updateFailed(data) {
        location.reload();

        var event = new CustomEvent('cartUpdated', { 'detail': { "command": command, "containerId": containerId, "url": url, "preloader": preloader, "data": dataObject } });
        document.dispatchEvent(event);
    }
}

var hideTimeOut;
Cart.prototype.HideMiniCart = function (containerId, delay) {
    hideTimeOut = setTimeout(function () {
        document.getElementById(containerId).style.display = "none";
    }, delay || 1000);
}

Cart.prototype.UpdateMiniCart = function (wrapperId, containerId, counterId, url) {
    var counter   = document.getElementById(counterId);
    var wrapper   = document.getElementById(wrapperId);
    var container = document.getElementById(containerId);

    if (!container || container.style.display == "block") {
        return;
    }

    if (counter.innerText != 0) {
        HandlebarsBolt.UpdateContent(containerId, url);
    }

    container.style.display = "block";
        
    wrapper.addEventListener('mouseleave', function (e) {
        clearTimeout(hideTimeOut);
        Cart.HideMiniCart(containerId);
    });

    wrapper.addEventListener('mouseenter', function (e) {
        clearTimeout(hideTimeOut);
    });
}

Cart.prototype.EnableCheckoutButton = function () {
    var stepButtonId = document.getElementById("CartV2.GotoStep3") ? "CartV2.GotoStep3" : "CartV2.GotoStep1";
    var stepButton = document.getElementById(stepButtonId);

    if (document.getElementById("EcomOrderCustomerAccepted").checked) {
        stepButton.disabled = false;
        stepButton.classList.remove('disabled');
    } else {
        stepButton.disabled = true;
        stepButton.classList.add('disabled');
    }
}

Cart.prototype.DeselectRadioGroup = function (radioGroupName) {
    var radioList = document.getElementsByName(radioGroupName);
    for (var i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) radioList[i].checked = false;
    }
}

Cart.prototype.SubmitCart = function () {
    document.getElementById('OrderSubmit').submit();
}

Cart.prototype.SelectParcelShop = function (locationData) {
    document.getElementById(locationData.fieldPrefix + "ParcelShopNumber_" + locationData.number).checked = true;
}

Cart.prototype.BuyForPoints = function (pageId, cartOrderlinesFeedPageId, orderLineId, productID, variantID) {
    Request.Fetch().post('/Default.aspx?ID=' + pageId + '&ProductID=' + productID + '&VariantID=' + variantID + '&CartCmd=addWithPoints&redirect=false', null, updateSuccess);
    function updateSuccess() {
        Cart.UpdateCart('Cart', '/Default.aspx?ID=' + cartOrderlinesFeedPageId, 'CartCmd=decorderline&key=' + orderLineId + '&redirect=false', true);
    }
}

var updateDelay;
Cart.prototype.ChangeQuantity = function (cartOrderlinesFeedPageId, orderLineId, quantity) {
    var quantity = '&QuantityOrderLine' + orderLineId + '=' + quantity;
    var comment = document.getElementById('EcomOrderCustomerComment');
    var accept = document.getElementById('EcomOrderCustomerAccepted');
    var customerComment = comment ? '&EcomOrderCustomerComment=' + comment.value : "";
    var customerAccepted = accept ? ('&EcomOrderCustomerAccepted=' + (accept.checked ? true : '')) : "";

    clearTimeout(updateDelay);
    updateDelay = setTimeout(function () {
        Cart.UpdateCart('Cart',
                        '/Default.aspx?ID=' + cartOrderlinesFeedPageId,
                        '&CartCmd=UpdateOrderlines' + quantity + customerComment + customerAccepted + '&redirect=false',
                        true);
    }, 800);
}

Cart.prototype.ShowLastAddedProductModal = function (lastAddedProduct) {
    if (document.getElementById('LastAddedProductModal')) {
        if (lastAddedProduct.productInfo && lastAddedProduct.productInfo.image) {
            lastAddedProduct.productInfo.image = "/Admin/Public/GetImage.ashx?width=50&height=50&crop=5&Compression=75&image=" + lastAddedProduct.productInfo.image;
        }
        HandlebarsBolt.CreateItemsFromJson(lastAddedProduct, 'LastAddedProductModal');
        document.getElementById('LastAddedProductModalTrigger').checked = true;
    }
}

Cart.prototype.ToggleMiniCart = function (wrapperId, containerId, counterId, miniCartFeedPageId) {
    this.UpdateMiniCart(wrapperId, containerId, counterId, '/Default.aspx?ID=' + miniCartFeedPageId + '&feedType=MiniCart')
    this.HideMiniCart(containerId);
}

var Cart = new Cart();
function initExpandTriggers() {
    document.querySelectorAll("[data-expand]").forEach(function (trigger) {
        var change = function () {
            var expandBlocks = document.querySelectorAll("[data-trigger=" + trigger.getAttribute("data-expand") + "]");
            expandBlocks.forEach(function (block) {
                if (block.classList.contains("js-expand-hide")) {
                    toggleClass(block, "expandable--collapsed", trigger.checked);
                } else {
                    toggleClass(block, "expandable--collapsed", !trigger.checked);
                }
            });
        };
        trigger.addEventListener('change', change);
        change(); //sync with start values
    });
}

function toggleClass(element, className, addClass) {
    if (addClass) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}
var Facets = function () { }

Facets.prototype.Init = function (selectedFacetsListId, containerId) {
    this.selectedFacets = document.querySelectorAll("#" + selectedFacetsListId + " [data-check]");
    this.container = document.getElementById(containerId);
    this.facetsQueryList = [];
    this.facetsToRemove = [];
    this.facetsToAdd = [];
    this.selectedFacets.forEach(function (facet) {
        var name = facet.getAttribute("name");
        var value = facet.getAttribute("value");
        this.facetsQueryList.push({ name: name, value: value });
    }, this);
}
//now this.facetsQueryList contains all preselected facets

Facets.prototype.UpdateFacets = function (facet) {
    var name = facet.getAttribute("name");
    var value = facet.getAttribute("value");
    if (facet.checked || facet.getAttribute("data-check") == "") {
        if (!this.facetsQueryList.hasOwnProperty(name)) {
            this.facetsQueryList[name] = [];
        }
        this.facetsQueryList[name].push(value);
        facet.setAttribute("data-check", "checked");
        facet.classList.add("checked");
        this.facetsToAdd.push({name: name, value: value});
    } else {
        this.facetsQueryList.splice(this.facetsQueryList.indexOf({ name: name, value: value }), 1);
        facet.setAttribute("data-check", "");
        facet.classList.remove("checked");
        this.facetsToRemove.push({ name: name, value: value });
    }
    this.Synchronize();
}

Facets.prototype.ResetFacets = function () {
    this.facetsQueryList.forEach(function (facet) {
        this.facetsToRemove.push({ name: facet.name, value: facet.value });
    }, this);
    this.Synchronize();
}

//Synchronize virtual facets state with real DOM and URL
Facets.prototype.Synchronize = function () {
    var queryParams = new QueryArray(this.container.getAttribute("data-json-feed"));
    var browserParams = new QueryArray(window.location.href);

    //sync adding
    this.facetsToAdd.forEach(function (facet) {
        if (queryParams.hasParam(facet.name) && queryParams.getValue(facet.name).trim() != "") {
            facet.value = queryParams.getValue(facet.name) + "," + facet.value;
        }
        queryParams.setValue(facet.name, facet.value);
        browserParams.setValue(facet.name, facet.value);
    });
    this.facetsToAdd = [];

    //sync removing
    this.facetsToRemove.forEach(function (facet) {
        if (queryParams.hasParam(facet.name)) {
            var commaArray = queryParams.getValue(facet.name).split(",");
            if (commaArray.length > 1) {
                var i = commaArray.indexOf(facet.value);
                if (i != -1) {
                    commaArray.splice(i, 1);
                    queryParams.setValue(facet.name, commaArray.join(","));
                    browserParams.setValue(facet.name, commaArray.join(","));
                }
            } else {
                if (queryParams.getValue(facet.name) == facet.value) {
                    queryParams.remove(facet.name);
                    browserParams.remove(facet.name);
                }
            }
        }
    });
    this.facetsToRemove = [];
        
    //update container
    HandlebarsBolt.UpdateContent(this.container.getAttribute("id"), queryParams.getFullUrl(), false, this.container.getAttribute("data-template"), "overlay");
    //update url
    history.pushState(null, null, browserParams.getFullUrl());
}

var Facets = new Facets();
var Filter = function () { }

Filter.prototype.FilterItems = function (e) {
    var currentFilter = e.currentTarget;
    var searchString  = currentFilter.value.toLowerCase();
    var filterItems   = currentFilter.closest(".js-filter").querySelectorAll('[data-filter-value]');

    filterItems.forEach(function (filterItem) {
        var filterItemValue = filterItem.getAttribute("data-filter-value").toLowerCase();

        if (filterItemValue.indexOf(searchString) != -1) {
            filterItem.classList.remove("u-hidden");
        } else {
            filterItem.classList.add("u-hidden");
        }
    });
}

var Filter = new Filter();

var FriendlyVariants = function () { }

//Handle option click (Adds/Removes a selection in the selections list)
FriendlyVariants.prototype.SelectFriends = function (e) {
    var clickedOption = e.currentTarget;
    var clickedOptionId = clickedOption.getAttribute("data-variant-id");
    var currentVariantsBlock = clickedOption.closest(".js-variants");
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var availableOptions = currentVariantsBlock.querySelectorAll(".js-variant-option");

    if (!clickedOption.classList.contains("checked")) {
        selectionsList.push(clickedOptionId);

        //If there already is a selection in the family (variant group), remove it
        var selectionFamily = currentVariantsBlock.querySelector("[data-variant-id='" + clickedOptionId + "']").getAttribute("data-family");

        for (var option = 0; option < availableOptions.length; option++) {
            var availableOptionId = availableOptions[option].getAttribute("data-variant-id");

            if (availableOptionId != clickedOptionId) {
                if (availableOptions[option].getAttribute("data-family") == selectionFamily) {
                    removeItem(selectionsList, availableOptionId);
                }
            }
        }
    } else {
        removeItem(selectionsList, clickedOptionId);
    }

    //Save the new variant selections
    currentVariantsBlock.setAttribute("data-variant-selections", selectionsList);

    //Call the update
    FriendlyVariants.Update(clickedOption.closest(".js-variants"), currentVariantsBlock.getAttribute("data-selection-complete"));
}

FriendlyVariants.prototype.Update = function (variantsContainer, selectionCompleteCommand) {
    var currentVariantsBlock = variantsContainer;
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var availableOptions = currentVariantsBlock.querySelectorAll(".js-variant-option");

    //Clean all previous renderings (selections + disabled)
    FriendlyVariants.CleanVariantOptions(availableOptions);

    //Go through all options
    if (selectionsList.length > 0) {
        for (var option = 0; option < availableOptions.length; option++) {
            var optionFriends = availableOptions[option].getAttribute("data-friends").split(',');
            var friendsCount = 0;

            //Check if the otion are friends with all selections
            for (var optionFriend = 0; optionFriend < optionFriends.length; optionFriend++) {
                var optionFriendId = optionFriends[optionFriend];

                for (var selection = 0; selection < selectionsList.length; selection++) {
                    var selectionFriendId = selectionsList[selection];
                    if (optionFriendId == selectionFriendId) {
                        friendsCount++;
                    }
                }
            }

            //If the right amount of friends is not found
            if (friendsCount != selectionsList.length) {
                FriendlyVariants.ExcludeVariantOption(availableOptions[option]);
            }
        }
    }

    //Set the selections
    for (var selection = 0; selection < selectionsList.length; selection++) {
        FriendlyVariants.SetVariantSelection(currentVariantsBlock.querySelector("[data-variant-id='" + selectionsList[selection] + "']"));
    }




    //Go through each selected variant and limit what is possible (This is the key algorithm for the variant options rendering)
    //for (var selection = 0; selection < selectionsList.length; selection++) {
    //    var selectionFriends = currentVariantsBlock.querySelector("[data-variant-id='" + selectionsList[selection] + "']").getAttribute("data-friends").split(',');

    //    FriendlyVariants.SetVariantSelection(currentVariantsBlock.querySelector("[data-variant-id='" + selectionsList[selection] + "']"));

    //    //Go through all options
    //    for (var option = 0; option < availableOptions.length; option++) {
    //        var foundInFriendsList = false;
    //        var friendsCount = 0;

    //        //Check if the option is friends with the selection
    //        for (var friend = 0; friend < selectionFriends.length; friend++) {
    //            var optionId = availableOptions[option].getAttribute("data-variant-id");

    //            if (optionId == selectionFriends[friend]) {
    //                foundInFriendsList = true;
    //                friendsCount++;
    //            }
    //        }

    //        //If the option is not friends with the selection
    //        if (!foundInFriendsList) {
    //            FriendlyVariants.ExcludeVariantOption(availableOptions[option]);
    //        }
    //    }
    //}

    //Check if a full selection is made, the do the action
    var selectionsCount = selectionsList.length;
    var totalVariantgroups = currentVariantsBlock.getAttribute("data-total-variant-groups");

    //Dynamicweb does only support black magic sorting on the variant keys (The order MUST follow the variant groups sort)
    selectionsList = FriendlyVariants.BlackMagicSelectionListSort(variantsContainer);

    if (selectionsCount == totalVariantgroups) {
        FriendlyVariants.SelectionComplete(selectionsList, selectionCompleteCommand, currentVariantsBlock);
    }
}

FriendlyVariants.prototype.BlackMagicSelectionListSort = function (variantsContainer, selectionsList) {
    var currentVariantsBlock = variantsContainer;
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var sortedSelectionsList = [];
    var availableOptions = currentVariantsBlock.querySelectorAll(".js-variant-option");
    
    for (var option = 0; option < availableOptions.length; option++) {
        var optionId = availableOptions[option].getAttribute("data-variant-id");

        for (var selection = 0; selection < selectionsList.length; selection++) {
            var selectionId = selectionsList[selection];

            if (optionId == selectionId) {
                sortedSelectionsList.push(selectionId);
            }
        }
    }

    return sortedSelectionsList;
}

FriendlyVariants.prototype.CleanVariantOptions = function(availableOptions) {
    for (var option = 0; option < availableOptions.length; option++) {
        availableOptions[option].classList.remove("disabled"); //RENDER
        availableOptions[option].classList.remove("checked");  //RENDER
    }
}

FriendlyVariants.prototype.SetVariantSelection = function(selectedOption) {
    selectedOption.classList.add("checked"); //RENDER
}

FriendlyVariants.prototype.ExcludeVariantOption = function(option) {
    option.classList.add("disabled");  //RENDER
}

FriendlyVariants.prototype.SelectionComplete = function (selectionsList, selectionCompleteCommand, currentVariantsBlock) {
    switch (selectionCompleteCommand) {
        case "UpdatePage":
            QueryArray.setParameterInCurrentURL("VariantID", selectionsList.join("."));
            break;
        case "UpdateData":
            var feedUrl = "/Default.aspx?ID=" + "PAGEID" + "&ProductID=PROD146" + "&VariantID=" + selectionsList.join(".") + "&feed=true&redirect=false";
            var productContainer = currentVariantsBlock.closest(".js-product");
            HandlebarsBolt.UpdateContent(productContainer.id, feedUrl);
            break;
    }
}

//Init on document loaded
function removeItem(array, item) {
    for (var i in array) {
        if (array[i] == item) {
            array.splice(i, 1);
            break;
        }
    }
}

var FriendlyVariants = new FriendlyVariants();
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
//HandlebarsBolt requires handlebars-v4.0.11 !

var HandlebarsBolt = function () { }
var handlebarsBoltCache = {};
var debug = window.location.search.indexOf('debug=true') >= 0 ? true : false;

const consoleStyles = {
    fail: "color: #612525; background-color: #f5bfbf; padding: 3px; font-weight: bold;",
    success: "color: #25612d; background-color: #bff5c6; padding: 3px; font-weight: bold;"
};

//Auto initialize the script templates and auto render the templates
document.addEventListener("DOMContentLoaded", function (event) {
    //Register templates
    var scriptTemplate = document.getElementsByTagName("script");

    for (var i = 0; i < scriptTemplate.length; i++) {
        var scriptTemplateElement = scriptTemplate[i];

        if (scriptTemplateElement.getAttribute("type") == "text/x-template") {
            Handlebars.registerPartial(scriptTemplateElement.id, scriptTemplateElement.innerHTML);
        }
    }

    //Initialize ajax elements
    var ajaxContainer = document.getElementsByClassName("js-handlebars-root");

    for (var i = 0; i < ajaxContainer.length; i++) {
        var ajaxContainerElement = ajaxContainer[i];

        if (!ajaxContainerElement.getAttribute('data-json-feed')) {
            console.log("Ajax element: Please specify json feed via data attribute: data-json-feed");
        }

        if (!ajaxContainerElement.hasAttribute('data-init-onload') || ajaxContainerElement.getAttribute('data-init-onload') == false) {
            HandlebarsBolt.UpdateContent(ajaxContainerElement.id, ajaxContainerElement.getAttribute('data-json-feed'), false, ajaxContainerElement.getAttribute('data-template'), ajaxContainerElement.getAttribute('data-preloader'));
        }
    }

    window.addEventListener('popstate', function (event) {
        location.reload();
    });
});

//Update the ajax loaded content using Handlebars to render the template
HandlebarsBolt.prototype.UpdateContent = function (containerId, url, updateUrl, templateId, preloader, addContent) {
    if (document.getElementById(containerId)) {
        var container = document.getElementById(containerId);

        if (url == null) {
            url = container.getAttribute("data-json-feed");
        } else {
            container.setAttribute("data-json-feed", url);
        }

        url = url.replace("?debug=true", "");
        url = url.replace("&debug=true", "");

        preloader = container.hasAttribute("data-preloader") ? container.getAttribute("data-preloader") : preloader;

        //Add a preloader until the template has been rendered (optional)
        if (preloader == "minimal") {
            if (addContent != true) {
                HandlebarsBolt.CleanContainer(containerId);
            }
            var preloaderElement = document.createElement('i');
            preloaderElement.className = "fas fa-circle-notch fa-spin preloader";
            preloaderElement.setAttribute('id', (container.getAttribute('id') + "_preloader"));
            container.appendChild(preloaderElement);
        } else if (preloader == "overlay") {
            var overlayElement = document.createElement('div');
            overlayElement.className = "preloader-overlay";
            overlayElement.setAttribute('id', "overlay");
            var overlayElementIcon = document.createElement('div');
            overlayElementIcon.className = "preloader-overlay__icon dw-mod";
            overlayElementIcon.style.top = window.pageYOffset + "px";
            overlayElement.appendChild(overlayElementIcon);

            if (document.getElementById("content")) {
                document.getElementById("content").parentNode.insertBefore(overlayElement, document.getElementById("content"));
            }
        }

        container.classList.remove("u-hidden");

        //Render a pre-render template, if specified, until the real template is ready
        if (container.hasAttribute('data-pre-render-template') && !container.hasChildNodes()) {
            var preRenderElement = document.createElement('div');
            preRenderElement.innerHTML = document.getElementById(container.getAttribute('data-pre-render-template')).innerHTML;

            var newElementNodes = preRenderElement.childNodes;
            for (var item = 1; item < newElementNodes.length; item++) {
                container.appendChild(newElementNodes[item]);
            }
        }

        //Check if there is requested a template by the data attribute
        if (templateId) {
            container.setAttribute("data-template", templateId);
        } else {
            if (container) {
                templateId = container.getAttribute("data-template");
            } else {
                console.log("The container: " + containerId + " is missing");
            }
        }

        //Save a template setting cookie for later use
        var cookieId = container.getAttribute("id") + "Template=";
        if (document.cookie.indexOf(cookieId) != -1) {
            document.cookie.replace(cookieId, templateId)
        } else {
            document.cookie = cookieId + templateId;
        }

        //Make the script template ready using Handlebars
        var scriptTemplate = document.getElementById(templateId).innerHTML;
        var template = Handlebars.compile(scriptTemplate);

        Request.Fetch().get(url, updateSuccess, updateFailed);

        function updateSuccess(data) {
            var compiledHtml = template(data);

            if (!addContent) {
                HandlebarsBolt.CreateCache(data);

                container.innerHTML = compiledHtml;
            } else {
                HandlebarsBolt.CreateCache(data);
                HandlebarsBolt.AddToCache(data, containerId);

                container.insertAdjacentHTML('beforeend', compiledHtml);
            }

            HandlebarsBolt.RevalidateImages();
            HandlebarsBolt.RemovePreloaders(containerId);

            var event = new CustomEvent('contentLoaded', { 'detail': { 'containerId': containerId, "url": url, "templateId": templateId, "addContent": addContent, "data": data } });
            document.dispatchEvent(event);
            container.dispatchEvent(event);
        }

        function updateFailed(data) {
            HandlebarsBolt.CleanContainer(containerId);
            HandlebarsBolt.RevalidateImages();
            HandlebarsBolt.RemovePreloaders(containerId);

            var event = new CustomEvent('contentLoaded', { 'detail': { 'containerId': containerId, "url": url, "templateId": templateId, "addContent": addContent, "data": data } });
            document.dispatchEvent(event);
            container.dispatchEvent(event);

            return false;
        }
    } else {
        console.log("Element could not be found: " + containerId);
    }
}

//Add content to an already used container
HandlebarsBolt.prototype.AddContent = function (containerId, url, updateUrl) {
    HandlebarsBolt.UpdateContent(containerId, url, updateUrl, null, "minimal", true);
}

//Render the template using a JSON data object, instead of getting it using a server request
HandlebarsBolt.prototype.CreateItemsFromJson = function (data, containerId, templateId) {
    var container = document.getElementById(containerId);

    if (templateId) {
        container.setAttribute("data-template", templateId);
    } else {
        if (container) {
            templateId = container.getAttribute("data-template");
        } else {
            console.log("The container: " + containerId + " is missing");
        }
    }

    var scriptTemplate = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(scriptTemplate);

    HandlebarsBolt.CreateCache(data);

    var compiledHtml = template(data);
    container.innerHTML = compiledHtml;

    var event = new CustomEvent('itemsCreatedFromJson', { 'detail': { 'containerId': containerId, "templateId": templateId, "data": data } });
    container.dispatchEvent(event);

    HandlebarsBolt.RevalidateImages();
}

//Remove the preloaders
HandlebarsBolt.prototype.RemovePreloaders = function (containerId) {
    var container = document.getElementById(containerId);
    if (document.body.contains(container)) {
        if (container.getAttribute('data-preloader') == 'overlay') {
            if (document.getElementById('overlay')) {
                document.getElementById('overlay').parentNode.removeChild(document.getElementById('overlay'));
            }
        } else {
            if (document.getElementById(container.getAttribute('id') + "_preloader")) {
                container.removeChild(document.getElementById(container.getAttribute('id') + "_preloader"));
            }
        }

        var event = new CustomEvent('removePreloaders');
        container.dispatchEvent(event);
    }
}

//Clean the container for either all the elements or the preloader
HandlebarsBolt.prototype.CleanContainer = function (containerId) {
    HandlebarsBolt.RemovePreloaders();

    if (document.getElementById(containerId)) {
        while (document.getElementById(containerId).firstChild) document.getElementById(containerId).removeChild(document.getElementById(containerId).firstChild);
        document.getElementById(containerId).classList.add("u-hidden");
    }

    var event = new CustomEvent('cleanContainer');
    document.dispatchEvent(event);
}

//Update the template (Used for shifting views - Remember to work with the cookie, if you wish to use the update after page reload)
HandlebarsBolt.prototype.UpdateTemplate = function (containerId, templateId) {
    var container = document.getElementById(containerId);

    var scriptTemplate = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(scriptTemplate);
    var dataFromCache = HandlebarsBolt.FindDataInCache(containerId);
    var compiledHtml = template(dataFromCache);

    container.setAttribute("data-template", templateId);

    var expiryTime = new Date();
    expiryTime.setTime(expiryTime.getTime() + (24 * 3600 * 1000));
    document.cookie = containerId + "Template=" + templateId + "; expires=" + expiryTime;

    container.innerHTML = compiledHtml;

    HandlebarsBolt.RevalidateImages();

    var event = new CustomEvent('updateTemplate', { 'detail': { 'containerId': containerId, "templateId": templateId, "data": dataFromCache } });
    container.dispatchEvent(event);
    document.dispatchEvent(event);
}

//If using bLazy to render images, revalidate when the template is fully rendered
HandlebarsBolt.prototype.RevalidateImages = function () {
    if (bLazy != null) {
        setTimeout(function () {
            bLazy.revalidate();
        }, 100);
    }
}

//Create a full data cache for reuse and fast template shifting
HandlebarsBolt.prototype.CreateCache = function (data, count, level) {
    if (Array.isArray(data) && data.length == 0) {
        return;
    }

    if (!count) {
        count = 0;
    }

    if (!level) {
        level = 0;
        if (debug) {
            console.info("%cHandlebarsBolt: Start caching", consoleStyles.success, data);
        }
    }

    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            HandlebarsBolt.CreateCacheObject(data[i], count, level);
        }
    } else {
        HandlebarsBolt.CreateCacheObject(data, count, level);
    }

    if (level == 0 && debug) {
        console.info("%cHandlebarsBolt: End caching", consoleStyles.success);
        console.log("Hint: You can type 'handlebarsBoltCache' in console to see current cache")
        console.log("");
    }
}

//Make the cache for each object
HandlebarsBolt.prototype.CreateCacheObject = function (data, count, level) {
    for (var property in data) {
        var obj = data[property];
        if (typeof obj == 'object' && obj && !(Array.isArray(obj) && obj.length == 0)) {
            //Make the ID unique for each sub object
            var uniqueId = data.id ? property + data.id : count == 0 ? property : property + count;
            var uniqueNumber = new Date().getTime();

            //Fix for multiple instances of the same element (Fx. multiple mini carts), while supporting different views (Fx. a product list) 
            if (document.getElementById(uniqueId)) {
                if (!document.getElementById(uniqueId).hasAttribute('data-save-cookie')) {
                    uniqueId = uniqueId + uniqueNumber;
                }
            }

            if (handlebarsBoltCache.hasOwnProperty(uniqueId)) {
                if (level == 0) {
                    HandlebarsBolt.MergeDeep(handlebarsBoltCache[uniqueId], obj);
                    if (debug) {
                        console.info("  Cache added: %s", uniqueId, obj);
                    }
                }
            } else {
                handlebarsBoltCache[uniqueId] = obj;
                if (level == 0 && debug) {
                    console.info("  Cache created: %s", uniqueId, obj);
                }
            }

            if (obj) {
                HandlebarsBolt.CreateCache(obj, count, level + 1);
            }

            count++;
        }
    }
}

HandlebarsBolt.prototype.MergeDeep = function(target, source) {
    for (var key in source) {
        if (source[key] && typeof source[key] === 'object' && target[key] != null) {
            HandlebarsBolt.MergeDeep(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    if (Array.isArray(target) && Array.isArray(source)) {
        target.splice(source.length, target.length);
    }
}

//Create a full data cache for reuse and fast template shifting
HandlebarsBolt.prototype.AddToCache = function (data, id) {
    if (handlebarsBoltCache[id]) {
        for (var i = 0; i < data.length; i++) {
            handlebarsBoltCache[id].push(data[i]);
        }
    } else {
        if (debug) {
            console.log("The handlebars bolt cache id: " + id + " does not exist. It may not be needed. You should handle the error, if you need it.");
        }
    }
}

//Create data in the cache object (Must be validated Json)
HandlebarsBolt.prototype.SetDataInCache = function (id, data) {
    handlebarsBoltCache[id] = data;
}

//Get a single cached data object by ID
HandlebarsBolt.prototype.FindDataInCache = function (id) {
    if (handlebarsBoltCache.hasOwnProperty(id)) {
        if (debug) {
            console.info("%cHandlebarsBolt: Data with key " + id + " was found in cache", consoleStyles.success, handlebarsBoltCache[id]);
        }
        return handlebarsBoltCache[id];
    } else {
        if (debug) {
            console.info("%cHandlebarsBolt: Data with key " + id + " not found in cache", consoleStyles.fail);
        }
        return null;
    }
}

//Parse to find the chosen cookie
HandlebarsBolt.prototype.GetCookie = function (name) {
    var pattern = RegExp(name + "=.[^;]*"),
        matched = document.cookie.match(pattern);

    if (matched) {
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}

//Conditional helper for Handlebars
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper('toJSON', function(object){
    return new Handlebars.SafeString(JSON.stringify(object).replace(/\"/g, '\''));
});

HandlebarsBolt.prototype.UpdateQueryParameters = function (containerId, queryParams, updateUrl) {
    var container = document.getElementById(containerId);
    var feedQueryParams = new QueryArray(container.getAttribute("data-json-feed"));
    for (var key in queryParams) {
        feedQueryParams.setValue(key, queryParams[key]);
    }
    HandlebarsBolt.UpdateContent(containerId, feedQueryParams.getFullUrl(), false, container.getAttribute("data-template"), "overlay");
    if (updateUrl) {
        var browserQueryParams = new QueryArray(window.location.href);
        for (var key in queryParams) {
            browserQueryParams.setValue(key, queryParams[key]);
        }
        history.pushState(null, null, browserQueryParams.getFullUrl());
    }
}


//Auto initialization
var HandlebarsBolt = new HandlebarsBolt();

Handlebars.registerHelper('facebookPixelSearch', function (name, productNumber, price, currency, searchString) {
    fbq('track', 'Search', {
        content_name: name,
        content_category: 'Products',
        content_ids: [ productNumber ],
        value: price,
        currency: currency,
        search_string: searchString
    });
});

Handlebars.registerHelper('googleEnchantImpression', function (list, currency, googleImpression) {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'ecommerce': {
                'currencyCode': currency,
                'impressions': [{
                    'name': googleImpression.name,  // Name or ID is required.
                    'id': googleImpression.id,
                    'price': googleImpression.price,
                    'brand': googleImpression.brand,
                    'category': googleImpression.category,
                    'variant': googleImpression.variant,
                    'list': list,
                    'position': googleImpression.position
                }]
            }
        });
    }
});

function googleEnchantImpressionClick(googleImpression) {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': { 'list': googleImpression.list },      // Optional list property.
                    'products': [{
                        'name': googleImpression.name,    // Name or ID is required.
                        'id': googleImpression.id,
                        'price': googleImpression.price,
                        'brand': googleImpression.brand,
                        'category': googleImpression.category,
                        'variant': googleImpression.variant,
                        'position': googleImpression.position
                    }]
                }
            },
            'eventCallback': function () {
                document.location = googleImpression.url
            }
        });
    }
};

Handlebars.registerHelper('googleEnchantImpressionDetails', function (googleImpression) {
    // Measure a view of product details. This example assumes the detail view occurs on pageload,
    // and also tracks a standard pageview of the details page.
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'ecommerce': {
                'detail': {
                    'actionField': {},    // 'detail' actions have an optional list property.
                    'products': [{
                        'name': googleImpression.name,    // Name or ID is required.
                        'id': googleImpression.id,
                        'price': googleImpression.price,
                        'brand': googleImpression.brand,
                        'category': googleImpression.category,
                        'variant': googleImpression.variant
                    }]
                }
            }
        });
    }
});

var googleEnchantImpressionEmptyCart = function () { };

Handlebars.registerHelper('googleEnchantImpressionEmptyCart', function (orderlines) {
    googleEnchantImpressionEmptyCart = function () {
        var products = [];
        orderlines.forEach(function (orderline) {
            products.push(orderline.googleImpression);
        });
        // Measure the removal of a product from a shopping cart.
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'removeFromCart',
                'ecommerce': {
                    'remove': { // 'remove' actionFieldObject measures.
                        'products': products
                    }
                }
            });
        }
    }
});
var LoadMore = function () { }

LoadMore.prototype.Next = function (selected) {
    var pagesize = parseInt(selected.getAttribute("data-page-size"));
    var queryParams = new QueryArray(window.location.search);
    var containerId = selected.getAttribute("data-container");
    var container = document.getElementById(containerId);
    var currentPage = selected.getAttribute("data-current");
    var totalPages = selected.getAttribute("data-total");

    queryParams.setValue("feedType", "productsOnly");
    queryParams.setPath(selected.getAttribute("data-feed-url"), true);
    queryParams.setValue("pagesize", pagesize, true);
    
    currentPage++;

    selected.setAttribute("data-current", currentPage);

    queryParams.setValue("pagenum", currentPage);
    queryParams.setValue("redirect", "false");

    if (currentPage <= totalPages) {

        HandlebarsBolt.AddContent(containerId, queryParams.getFullUrl());

        queryParams = new QueryArray(window.location.href);

        if (queryParams.hasParam("pagesize")) {
            pagesize += parseInt(queryParams.getValue("pagesize"));
        } else {
            pagesize *= 2;
        }

        queryParams.setValue("pagesize", pagesize);

        history.pushState(null, null, queryParams.getFullUrl());
    }

    if (currentPage == totalPages) {
        selected.classList.add('u-hidden');
    }

    var event = new CustomEvent('loadMore', { 'detail': { 'currentPage': currentPage, "totalPages": totalPages, "url": queryParams.getFullUrl(), "container": containerId } });
    document.dispatchEvent(event);
    container.dispatchEvent(event);
}

var LoadMore = new LoadMore();
// Multiple Markers
var markersArray = new Array();

var Maps = function () { }

Maps.prototype.Init = function (containerId, locationsList, markerCallback, selectionCallback, buttonText) {
    if (document.getElementById(containerId) && !document.getElementById(containerId).hasAttribute('data-initialized')) {
        if (locationsList.length > 0) {
            var map;
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = {
                mapTypeId: 'roadmap'
            };

            // Display a map on the page
            map = new google.maps.Map(document.getElementById(containerId), mapOptions);
            map.setTilt(45);

            var markers = new Array();
            var infoWindowContent = [];

            for (var i = 0; i < locationsList.length; i++) {
                var latitude = locationsList[i].latitude != null ? locationsList[i].latitude.replace(",", ".") : "";
                var longitude = locationsList[i].longitude != null ? locationsList[i].longitude.replace(",", ".") : "";
                var locationArray = [locationsList[i].company, latitude, longitude];
                var locationCallback = selectionCallback ? '<button class="btn btn--primary dw-mod" onclick="' + selectionCallback + '()">' + buttonText + '</button>' : "";
                var locationDetails = locationsList[i].address ? '<p>' + locationsList[i].address + '</p>' + '<p>' + locationsList[i].zip + ' ' + locationsList[i].city + ' ' + locationsList[i].country + locationsList[i].description + '</p>' : "<p>" + locationsList[i].description + "</p>";
                var locationInfo = ['<div class="map-container__canvas__location-info">' + '<h5>' + locationsList[i].company + '</h5>' + locationDetails + locationCallback + '</div>'];
                markers.push(locationArray);
                infoWindowContent.push(locationInfo);
            }

            // Display multiple markers on a map
            var infoWindow = new google.maps.InfoWindow(), marker, i;

            //Make it possible to use the geocoder to look up addresses
            var geocoder = new google.maps.Geocoder();

            // Loop through our array of markers & place each one on the map
            for (i = 0; i < markers.length; i++) {
                var position;

                if (latitude == "") {
                    var address = locationsList[i].address + ", " + locationsList[i].city + ", " + "Denmark";
                    var title = markers[i][0]

                    geocoder.geocode({ 'address': address }, function (results, status) {
                        if (status == 'OK') {
                            position = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());

                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                title: title
                            });

                            // Allow each marker to have an info window
                            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                                return function () {
                                    infoWindow.setContent(infoWindowContent[i][0]);
                                    infoWindow.open(map, marker);

                                    if (markerCallback) {
                                        markerCallback(locationsList[i]);
                                    }

                                    var event = new CustomEvent('mapMarkerOnClick', { 'detail': { 'data': locationsList[i] } });
                                    document.dispatchEvent(event);
                                    this.dispatchEvent(event);
                                }
                            })(marker, i));

                            markersArray.push(marker);
                            bounds.extend(position);

                            map.fitBounds(bounds);
                        } else {
                            console.log('Geocode was not successful for the following reason: ' + status);
                        } 
                    });
                } else {
                    position = new google.maps.LatLng(markers[i][1], markers[i][2]);

                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: title
                    });

                    // Allow each marker to have an info window
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infoWindow.setContent(infoWindowContent[i][0]);
                            infoWindow.open(map, marker);

                            if (markerCallback) {
                                markerCallback(locationsList[i]);
                            }

                            var event = new CustomEvent('mapMarkerOnClick', { 'detail': { 'data': locationsList[i] } });
                            document.dispatchEvent(event);
                            this.dispatchEvent(event);
                        }
                    })(marker, i));

                    markersArray.push(marker);
                    bounds.extend(position);

                    map.fitBounds(bounds);
                }
            }

            // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
            var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                if (markers.length == 1) {
                    map.setZoom(10);
                }

                google.maps.event.removeListener(boundsListener);
            });

            document.getElementById(containerId).setAttribute("data-initialized", "True");
        }
    }
}

Maps.prototype.OpenInfo = function (markerId) {
    google.maps.event.trigger(markersArray[markerId], 'click');

    var event = new CustomEvent('mapOpenInfo', { 'detail': { 'markerId': markerId } });
    document.dispatchEvent(event);
}

var Maps = new Maps();

var MatchVariants = function () { }

//Public method: Handle option click (Adds/Removes a selection in the selections list)
MatchVariants.prototype.SelectThis = function (e) {
    var clickedOption = e.currentTarget;
    var clickedOptionId = clickedOption.getAttribute("data-variant-id");
    var currentVariantsBlock = clickedOption.closest(".js-variants");
    var selectionCompleteCommand = currentVariantsBlock.getAttribute("data-selection-complete");
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var allOptions = currentVariantsBlock.querySelectorAll(".js-variant-option");
    var allOptionsTotal = allOptions.length;

    if (!clickedOption.classList.contains("checked")) {
        selectionsList.push(clickedOptionId);

        //If there already is a selection in the variant group, remove it
        var selectionGroup = currentVariantsBlock.querySelector("[data-variant-id='" + clickedOptionId + "']").getAttribute("data-variant-group");

        for (var optionItem = 0; optionItem < allOptionsTotal; optionItem++) {
            var availableOptionId = allOptions[optionItem].getAttribute("data-variant-id");

            if (availableOptionId != clickedOptionId) {
                if (allOptions[optionItem].getAttribute("data-variant-group") == selectionGroup) {
                    MatchVariants.RemoveItem(selectionsList, availableOptionId);
                }
            }
        }
    } else {
        MatchVariants.RemoveItem(selectionsList, clickedOptionId);
    }

    //Save the new variant selections
    currentVariantsBlock.setAttribute("data-variant-selections", selectionsList);

    //Call the update
    MatchVariants.Update(clickedOption.closest(".js-variants"), selectionCompleteCommand);
}

//Private method, may in rare cases be used public: Update all variant selections and states
MatchVariants.prototype.Update = function (currentVariantsBlock, selectionCompleteCommand) {
    var selectionCompleteCommand = selectionCompleteCommand != null ? selectionCompleteCommand : "DoNotning";
    var selectedOptions = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var allOptions = currentVariantsBlock.querySelectorAll(".js-variant-option"); 
    var totalVariantgroups = currentVariantsBlock.getAttribute("data-total-variant-groups");

    //Clean all previous renderings (selections + disabled)
    MatchVariants.CleanVariantOptions(allOptions);

    if (selectedOptions.length > 0) {
        var reg = new RegExp("\'", 'g');
        var variantOptionsByGroup = JSON.parse(currentVariantsBlock.getAttribute("data-variants").replace(reg, "\""));
        var variantCombinations = JSON.parse(currentVariantsBlock.getAttribute("data-combinations").replace(reg, "\""));

        if (totalVariantgroups > 1) {
           var optionsToHide = MatchVariants.GetOptionsToHide(variantOptionsByGroup, variantCombinations, selectedOptions);
            for (var optionItem = 0; optionItem < optionsToHide.length; optionItem++) {
                var optionElement = currentVariantsBlock.querySelector("[data-variant-id='" + optionsToHide[optionItem] + "']")
                MatchVariants.ExcludeVariantOption(optionElement);
            }
        } 
    }

    //Set the selections
    for (var selection = 0; selection < selectedOptions.length; selection++) {
        MatchVariants.SetVariantSelection(currentVariantsBlock.querySelector("[data-variant-id='" + selectedOptions[selection] + "']"));
    }

    //Check if a full selection is made, the do the action
    var selectionsCount = selectedOptions.length;
    if (selectionsCount == totalVariantgroups) {
        MatchVariants.SelectionComplete(currentVariantsBlock, selectionCompleteCommand);
    } else {
        MatchVariants.SelectionNotComplete(currentVariantsBlock);
    }
}

//Public method: Clean all options for bot selections and states 
MatchVariants.prototype.CleanVariantOptions = function (allOptions) {
    for (var option = 0; option < allOptions.length; option++) {
        allOptions[option].classList.remove("disabled"); //RENDER
        allOptions[option].classList.remove("checked");  //RENDER
    }
}

//Public method: Render a selection on an option 
MatchVariants.prototype.SetVariantSelection = function (selectedOption) {
    selectedOption.classList.add("checked"); //RENDER
}

//Public method: Render an disabled state on an option 
MatchVariants.prototype.ExcludeVariantOption = function (option) {
    option.classList.add("disabled");  //RENDER
}

//Public method: What to do, while the selection is not complete  
MatchVariants.prototype.SelectionNotComplete = function (currentVariantsBlock) {
    var cartButton = currentVariantsBlock.closest(".js-product").querySelector(".js-cart-btn");
    var favoriteButton = currentVariantsBlock.closest(".js-product").querySelector(".js-favorite-btn");
    var helpText = currentVariantsBlock.querySelector(".js-help-text");

    //Disable the cart button
    if (cartButton) {
        cartButton.disabled = true;
        cartButton.classList.add('disabled'); //RENDER
    }

    //Disable the favorite button
    if (favoriteButton) {
        favoriteButton.disabled = true;
        favoriteButton.classList.add('disabled'); //RENDER
    }

    //Render help text
    if (helpText) {
        helpText.classList.remove('u-visibility-hidden'); //RENDER
    }
}

//Public method: Toggle what to do when all the selections are complete. Often, refresh the page or get new data.
MatchVariants.prototype.SelectionComplete = function (currentVariantsBlock, selectionCompleteCommand) {
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var cartButton = currentVariantsBlock.closest(".js-product").querySelector(".js-cart-btn");
    var favoriteButton = currentVariantsBlock.closest(".js-product").querySelector(".js-favorite-btn");
    var helpText = currentVariantsBlock.querySelector(".js-help-text");

    //Dynamicweb does only support black magic sorting on the variant keys (The order MUST follow the variant groups sort)
    selectionsList = MatchVariants.SelectionListSort(currentVariantsBlock);

    var pageId = currentVariantsBlock.getAttribute("data-page-id");
    var productId = currentVariantsBlock.getAttribute("data-product-id");
    var cleanLink = "/Default.aspx?ID=" + pageId + "&ProductID=" + productId + "&VariantID=" + selectionsList.join(".") + "&redirect=false";

    switch (selectionCompleteCommand) {
        case "UpdatePage":
            window.location = cleanLink;
            break;
        case "UpdateData":
            var feedUrl = cleanLink + "&feed=true";
            var productContainer = currentVariantsBlock.closest(".js-product");
            HandlebarsBolt.UpdateContent(productContainer.id, feedUrl);

            productContainer.addEventListener('contentLoaded', function (e) {
                MatchVariants.Update(productContainer.querySelector(".js-variants"), "DoNothing");
            }, false);
            
            break;
    }

    if (cartButton && !cartButton.classList.contains("js-stay-disabled")) {
        cartButton.disabled = false;
        cartButton.classList.remove('disabled'); //RENDER
    }

    if (favoriteButton) {
        favoriteButton.disabled = false;
        favoriteButton.classList.remove('disabled'); //RENDER
    }

    if (helpText) {
        helpText.classList.add('u-visibility-hidden'); //RENDER
    }
}

//Private method: Sort the selections by the group they are in (That is how Dynamicweb needs them)
MatchVariants.prototype.SelectionListSort = function (variantsContainer) {
    var currentVariantsBlock = variantsContainer;
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var selectionsListTotal = selectionsList.length;
    var sortedSelectionsList = [];
    var allOptions = currentVariantsBlock.querySelectorAll(".js-variant-option");
    var allOptionsTotal = allOptions.length;

    for (var optionItem = 0; optionItem < allOptionsTotal; optionItem++) {
        var optionId = allOptions[optionItem].getAttribute("data-variant-id");

        for (var selectionItem = 0; selectionItem < selectionsListTotal; selectionItem++) {
            var selectionId = selectionsList[selectionItem];

            if (optionId == selectionId) {
                sortedSelectionsList.push(selectionId);
            }
        }
    }

    return sortedSelectionsList;
}

//Private method: Return an array of all the variant options that should be hidden, after the selections is made
MatchVariants.prototype.GetOptionsToHide = function(variantOptionsByGroup, variantCombinations, selectedOptions) {
    var selectedOptionsCount = selectedOptions.length;
    var variantCombinationsCount = variantCombinations.length;
    var optionsToHide = [];

    //For each group, hide all variantoptions that are not valid for current selection
    for (var groupIndex = 0; groupIndex < variantOptionsByGroup.length; groupIndex++) {
        var optionsToHideForThisGroup = variantOptionsByGroup[groupIndex];//Create list with all options in the group and remove options as they are matched as still possible
        var groupSelectedOption = MatchVariants.FindSelectedGroupOption(selectedOptionsCount, selectedOptions, optionsToHideForThisGroup);

        //Investigate which combinations is possible
        for (var combinationIndex = 0; combinationIndex < variantCombinationsCount; combinationIndex++) {
            var variantCombination = variantCombinations[combinationIndex]; //Array of variant options
            var showOptionsOfCombination = MatchVariants.IsValidSelection(variantCombination, selectedOptionsCount, selectedOptions, groupSelectedOption);

            //If all selections are part of a final combination, then build an array of still available options
            if (showOptionsOfCombination) {
                MatchVariants.ShowVariantCombinationOptions(variantCombination, optionsToHideForThisGroup);
            }
        }
        //Build the array of options to hide by adding the hidden options from the current group
        optionsToHide = optionsToHide.concat(optionsToHideForThisGroup);
    }
    return optionsToHide;
}

//Private method: Loops through all combinationOptions to see if the whole of the combination is valid as per the selected options
MatchVariants.prototype.IsValidSelection = function(combinationOptions, selectedCount, selectedOptions, groupSelectedOption) {
    var count = 0;
    var optionCount = combinationOptions.length;
    //Check if the selections are ALL part of the full combination (Final product) 
    for (var selectionIndex = 0; selectionIndex < selectedCount; selectionIndex++) {
        var selectedOption = selectedOptions[selectionIndex];
        if (selectedOption == groupSelectedOption) { //Match current group as a wildcard. Fx. VO11.VO21.VO31 should match as VO11.?.VO31 for the second variantgroup 
            count++;
        } else {
            for (var optionIndex = 0; optionIndex < optionCount; optionIndex++) {
                var combinationOption = combinationOptions[optionIndex];
                if (selectedOption == combinationOption) {
                    count++;
                }
            }
        }
    }
    return (selectedCount == count);
}

//Private method: Find the first option of the group that is part of the selection
MatchVariants.prototype.FindSelectedGroupOption = function(selectedCount, selectedOptions, groupOptions) {
    var optionsTotal = groupOptions.length;
    var selectedGroupOption = "";
    for (var selectionIndex = 0; selectionIndex < selectedCount; selectionIndex++) {
        var selectedOption = selectedOptions[selectionIndex];
        for (var variantIndex = 0; variantIndex < optionsTotal; variantIndex++) {
            if (selectedOption == groupOptions[variantIndex]) {
                selectedGroupOption = selectedOptions[selectionIndex];
            }
        }
    }
    return selectedGroupOption;
}

//Private method: Ensure that all options of the specified combination is shown (by removing them from optionsToHideForThisGroup)
MatchVariants.prototype.ShowVariantCombinationOptions = function(combinationOptions, optionsToHideForThisGroup) {
    var combinationOptionsCount = combinationOptions.length;
    for (var optionIndex = 0; optionIndex < combinationOptionsCount; optionIndex++) {
        var optionToShow = combinationOptions[optionIndex];
        MatchVariants.RemoveItem(optionsToHideForThisGroup, optionToShow);
    }
}

//Private method: Remove an specified item from an array
MatchVariants.prototype.RemoveItem = function (array, item) {
    for (var i in array) {
        if (array[i] == item) {
            array.splice(i, 1);
            break;
        }
    }
}

var MatchVariants = new MatchVariants();


//IE Polyfill for CustomEvents
(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

//Polyfill for Closest()
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) { };
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

//Polyfill for forEach()
// (en): http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1. 
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

//fix for e.srcElement in firefox and e.target in IE
//https://stackoverflow.com/questions/13602039/e-srcelement-is-undefined-in-firefox
function getTarget(obj) {
    var targ;
    var e = obj;
    if (e.target) {
        targ = e.target;
    } else if (e.srcElement) {
        targ = e.srcElement;
    }
    if (targ.nodeType == 3) {
        // defeat Safari bug
        targ = targ.parentNode;
    }
    return targ;
}
function QueryArray(queryStr) {
    this.queryArray = {};

    if (typeof queryStr != "string" || queryStr == "") {
        return;
    }
    var queryParams = "";

    if (queryStr.indexOf('=') == -1) {         //site.com
        this.path = queryStr.replace("?", ""); //site.com?
        return;
    }

    if (queryStr.indexOf('?') != -1) {         //site.com?a=1  or  ?a=1
        var arr = queryStr.split('?');
        this.path = arr[0];
        queryParams = arr[1];
    } else {
        queryParams = queryStr;                //a=1
    }

    var queryArr = queryParams.split("&");
    for (var q = 0, qArrLength = queryArr.length; q < qArrLength; q++) {
        var qArr = queryArr[q].split("=");
        this.setValue(decodeURIComponent(qArr[0]), decodeURIComponent(qArr[1]));
    }
}

QueryArray.prototype.setPath = function(path, saveQueryParams) {
    if (path.indexOf('?') == -1) {
        this.path = path;
        return;
    }
    var arr = path.split('?');
    this.path = arr[0];
        
    if (saveQueryParams) {
        this.combineWithParams(arr[1]);
    }
}

QueryArray.prototype.combineWithParams = function (str) {
    if (str.trim() == "") {
        return;
    }
    var newParams = new QueryArray(str);
    var queryArr = newParams.queryArray;
    for (var key in queryArr) {
        if (newParams.hasParam(key)) {
            this.setValue(key, queryArr[key]);
        }
    }
}

QueryArray.prototype.getQueryString = function() {
    var arr = [];
    //fix because ID should be always first in query
    if (this.hasParam("ID")) {
        arr.push("ID" + "=" + this.getValue("ID"));
    }
    for (var key in this.queryArray) {
        if (key.toLowerCase() != "id" && this.hasParam(key) && this.queryArray[key].trim() != "") {
            arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(this.queryArray[key]));
        }
    }
    return arr.length > 0 ? "?" + arr.join("&") : "";
}

QueryArray.prototype.getFullUrl = function () {
    return this.path + this.getQueryString();
}

QueryArray.prototype.copy = function() {
    return new QueryArray(this.getFullUrl());
}

QueryArray.prototype.getValue = function(key) {
    return this.queryArray[key];
}

QueryArray.prototype.setValue = function(key, newValue, setIfExist) {
    if (!setIfExist || this.hasParam(key)) {
        this.queryArray[decodeURIComponent(key)] = decodeURIComponent(newValue);
    }
}

QueryArray.prototype.hasParam = function(key) {
    return this.queryArray.hasOwnProperty(key);
}

QueryArray.prototype.remove = function(key) {
    delete this.queryArray[key];
}

//static

QueryArray.setParameterInCurrentURL = function(key, newValue, setIfExist) {
    var queryParams = new QueryArray(window.location.href);
    if (newValue == "") {
        queryParams.remove(key);
    } else {
        queryParams.setValue(key, newValue, setIfExist);
    }
    window.location.href = queryParams.getFullUrl();
}

QueryArray.getParameterFromCurrentURL = function (key) {
    var queryParams = new QueryArray(window.location.href);
    return queryParams.getValue(key);
}
//The RapidoHook is a simple wrapper for the Javascript event listeners. They exist to make the methods strong and simplify the code when you use it for extending. 
//You are still free to just use the classic event listeneres, as you are used to.


var RapidoHook = function () { }

//The base event wrapper method
RapidoHook.prototype.event = function (callback, callbackType, eventName, targetElement) {
    targetElement = targetElement != null ? targetElement : document;

    if (callbackType != "attach" && callbackType != "detach" && callbackType != null) {
        console.log("RapidoHook: The type must be either \"attach\" or \"detach\"");
    }

    if (!targetElement) {
        console.log("RapidoHook: The target element does not exist. The fallback is the \"document\" element.");
    } 

    if (!eventName) {
        console.log("RapidoHook: You must specify an event name");
        return;
    }

    if (callbackType == null || callbackType == "attach") {
        targetElement.addEventListener(eventName, function (e) {
            callback(e);
        }, false);
    }

    if (callbackType == "detach") {
        targetElement.removeEventListener(eventName, function (e) {
            callback(e);
        }, false);
    }
}


//Available hooks that you could use

//Buttons.js
RapidoHook.prototype.buttonIsLocked = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'buttonIsLocked', targetElement);
}

//Carousel.js
RapidoHook.prototype.initSlideShow = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'initSlideShow', targetElement);
}

RapidoHook.prototype.shiftSlide = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'shiftSlide', targetElement);
}

//Cart.js
RapidoHook.prototype.addToCart = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'addToCart', targetElement);
}

RapidoHook.prototype.emptyCart = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'emptyCart', targetElement);
}

RapidoHook.prototype.cartUpdated = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'cartUpdated', targetElement);
}

//Facets.js
RapidoHook.prototype.updateFacets = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'updateFacets', targetElement);
}

RapidoHook.prototype.resetFacets = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'resetFacets', targetElement);
}

//LoadMore.js
RapidoHook.prototype.loadMore = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'loadMore', targetElement);
}

//Maps.js
RapidoHook.prototype.mapMarkerOnClick = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'mapMarkerOnClick', targetElement);
}

RapidoHook.prototype.mapOpenInfo = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'mapOpenInfo', targetElement);
}

//Scroll.js
RapidoHook.prototype.saveScrollPosition = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'saveScrollPosition', targetElement);
}

RapidoHook.prototype.setScrollPosition = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'setScrollPosition', targetElement);
}

RapidoHook.prototype.savePagePosition = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'savePagePosition', targetElement);
}

//HandlebarsBolt.js (Targeted to specific Rapido elements)
RapidoHook.prototype.contentLoaded = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

RapidoHook.prototype.itemsCreatedFromJson = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'itemsCreatedFromJson', targetElement);
}

RapidoHook.prototype.removePreloaders = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'removePreloaders', targetElement);
}

RapidoHook.prototype.updateTemplate = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'updateTemplate', targetElement);
}

RapidoHook.prototype.productListLoaded = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', document.getElementById("productList"));
}

RapidoHook.prototype.productListUpdated = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', document.getElementById("ProductsContainer"));
}

RapidoHook.prototype.productListViewChange = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'updateTemplate', document.getElementById("ProductsContainer"));
}

RapidoHook.prototype.miniCartLoaded = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', document.getElementById("miniCart"));
}

RapidoHook.prototype.cartLoaded = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', document.getElementById("Cart"));
}

RapidoHook.prototype.customProductListLoaded = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

RapidoHook.prototype.customProductListUpdated = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

RapidoHook.prototype.customProductListViewChange = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'updateTemplate', targetElement);
}

RapidoHook.prototype.customMiniCartLoaded = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

RapidoHook.prototype.customCartLoaded = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

//ImageList.js
RapidoHook.prototype.imageListLoadImage = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'imageListLoadImage', targetElement);
}

RapidoHook.prototype.imageListOpenImage = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'imageListOpenImage', targetElement);
}

RapidoHook.prototype.imageListPreviousImage = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'imageListPreviousImage', targetElement);
}

RapidoHook.prototype.imageListNextImage = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'imageListNextImage', targetElement);
}

//Variants.js
RapidoHook.prototype.variantsUpdate = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'variantsUpdate', targetElement);
}

RapidoHook.prototype.variantsSelectionComplete = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'variantsSelectionComplete', targetElement);
}

//Wireframe.js
RapidoHook.prototype.wireframeInit = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'wireframeInit', targetElement);
}


var RapidoHook = new RapidoHook();

var RememberState = function () { }
var loadedRememberStateElements = [];
var observer = new MutationObserver(function (mutations) { });
var config = { attributes: true, childList: false, characterData: false }

document.addEventListener("DOMContentLoaded", function (event) {
    RememberState.GetState();
    initExpandTriggers();

    //Make it work with Ajax loaded content
    var ajaxContainer = document.getElementsByClassName("js-handlebars-root");
    if (ajaxContainer.length > 0) {
        for (var i = 0; i < ajaxContainer.length; i++) {
            ajaxContainer[i].addEventListener('contentLoaded', function (e) {
                RememberState.GetState();
                initExpandTriggers();
            }, false);
        }
    }
});

RememberState.prototype.SaveState = function () {
    var rememberStateElements = document.getElementsByClassName("js-remember-state");

    for (var elm = 0; elm < rememberStateElements.length; elm++) {
        var target = rememberStateElements[elm];

        if (RememberState.ElementExists(target.id) == false) {

            //Save cookie when an attribute changes on the element
            observer = new MutationObserver(function (mutations) {
                var stateCookie = "StateCookie_" + mutations[0].target.id + "=[{";

                if (target.getAttribute("type") != "checkbox") {
                    var count = 0;

                    mutations.forEach(function (mutation) {
                        stateCookie += '"' + mutation.attributeName + '": "' + mutation.target.getAttribute(mutation.attributeName) + '"';
                        if (count != mutations.length - 1) {
                            stateCookie += ",";
                        }
                        count++;
                    });
                } else {
                    stateCookie += '"checked": "' + mutations[0].target.checked + '"';
                }

                stateCookie += "}]";

                document.cookie = stateCookie;
            });

            if (target.getAttribute("type") == "checkbox") {
                target.addEventListener('click', function (e) {
                    e.target.setAttribute('checked', e.target.checked);
                });
            }

            observer.observe(target, config);
        }

        loadedRememberStateElements.push(target.id);
    }
}

RememberState.prototype.GetState = function () {
    var rememberStateElements = document.getElementsByClassName("js-remember-state");

    for (var elm = 0; elm < rememberStateElements.length; elm++) {
        var target = rememberStateElements[elm];

        //Get the cookie and set the saved attributes
        var resultCookie = RememberState.GetCookie("StateCookie_" + target.id);

        if (resultCookie) {
            resultCookie = JSON.parse(resultCookie);

            for (var crumb = 0; crumb < resultCookie.length; crumb++) {
                for (property in resultCookie[crumb]) {
                    target.setAttribute(property, resultCookie[crumb][property]);

                    if (property == "checked") {
                        if (resultCookie[crumb][property] == "false") {
                            target.removeAttribute("checked");
                        } else {
                            target.checked = true;
                        }
                    }
                }
            }
        } 
    }

    //Set up remember state again after the last state is set
    RememberState.SaveState();
}

//Parse to find the chosen cookie
RememberState.prototype.ElementExists = function (elementId) {
    var condition = false;

    for (var i = 0; i < loadedRememberStateElements.length; i++) {
        if (loadedRememberStateElements[i] == elementId) {
            condition = true;
        }
    }

    return condition
}

//Parse to find the chosen cookie
RememberState.prototype.GetCookie = function (name) {
    var pattern = RegExp(name + "=.[^;]*"),
        matched = document.cookie.match(pattern);

    if (matched) {
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}


//Set simple checkbox state by url parameter (js-remember-state class not required)
RememberState.prototype.getSearchParameters = function() {
    var paramstring = window.location.search.substr(1);
    return paramstring != null && paramstring != "" ? RememberState.transformToAssocArray(paramstring) : {};
}

RememberState.prototype.transformToAssocArray = function (paramstring) {
    var params = {};
    var paramsarray = paramstring.split("&");
    for (var i = 0; i < paramsarray.length; i++) {
        var tmparray = paramsarray[i].split("=");
        params[tmparray[0]] = tmparray[1];
    }
    return params;
}

document.addEventListener("DOMContentLoaded", function (event) {
    var params = RememberState.getSearchParameters();
    for (property in params) {
        var element = document.getElementById(property);
        if (element && (element.type === 'checkbox')) {
            element.checked = params[property];
        }
    }
});

var RememberState = new RememberState();
function Request() {}

Request.prototype.newRequest = function (url, method, data, successCallback, errorCallback, returnJson) {
    if (returnJson == null) {
        returnJson = true;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        function error(message) {
            console.warn(message);

            if (typeof errorCallback == "function") {
                errorCallback(this.response);
            }
        }

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var data;

            if (this.responseType === 'json') {
                data = this.response.message.trim();
            } else {
                data = this.response.trim();
            }

            if (returnJson) {
                if (data == "") {
                    console.warn(url + ": Response is empty");
                    data = {};
                } else if (data.indexOf("<") == 0) {
                    error(url + ": URL returned HTML instead of JSON");
                    return;
                } else {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        error(url + ": Could not parse the JSON data");
                        return;
                    }
                }
            }

            if (typeof successCallback == "function") {
                successCallback(data);
            }
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
            error(url + ": XMLHttpRequest failed");
        }
    };

    xhr.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
    xhr.setRequestHeader('cache-control', 'max-age=0');
    xhr.setRequestHeader('expires', '0');
    xhr.setRequestHeader('expires', 'Tue, 01 Jan 1980 1:00:00 GMT');
    xhr.setRequestHeader('pragma', 'no-cache');

    if (data) { 
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
};

Request.prototype.Fetch = function () {
    var self = this;

    return {
        get: function (url, successCallback, errorCallback, returnJson) {
            self.newRequest(url, "GET", null, successCallback, errorCallback, returnJson);
        },

        post: function (url, data, successCallback, errorCallback, returnJson) {
            self.newRequest(url, "POST", data, successCallback, errorCallback, returnJson);
        }
    };
};

var Request = new Request();

var Scroll = function () { }

document.addEventListener("DOMContentLoaded", function (event) {
    var productList = document.getElementById("productList");

    if (productList && productList.classList.contains("js-handlebars-root")) {
        productList.addEventListener('contentLoaded', function (e) {
            setTimeout(function () {
                var scrollPos = Scroll.getURLParameter("ScrollPos");
                window.scroll(0, scrollPos);
            }, 1000);
        }, false);
    } else {
        var ajaxContainer = document.getElementsByClassName("js-handlebars-root");
        if (ajaxContainer.length > 0) {
            for (var i = 0; i < ajaxContainer.length; i++) {
                ajaxContainer[i].addEventListener('contentLoaded', function (e) {
                    Scroll.SetPosition();
                    Scroll.SetPagePosition();
                }, false);
            }
        }
    }

    Scroll.SetPagePosition();
});

Scroll.prototype.SavePosition = function (e) { 
    e.preventDefault();

    var url = window.location.href;

    var seperator = "?";
    if (url.indexOf("?") != -1) {
        seperator = "&";
    }

    var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    if (Scroll.getURLParameter("ScrollPos")) {
        url = url.replace(/\bScrollPos=[^&#]+/g, "ScrollPos=" + Math.round(scrollPos));
    } else {
        url = window.location + seperator + "ScrollPos=" + Math.round(scrollPos);
    }
    
    history.replaceState(null, null, url);

    var event = new CustomEvent('saveScrollPosition', { 'detail': { 'scrollPos': scrollPos } });
    document.dispatchEvent(event);

    window.location.href = e.currentTarget.getAttribute("href");
}

Scroll.prototype.SetPosition = function () {
    var scrollPos = Scroll.getURLParameter("ScrollPos");

    if (scrollPos != null) {
        setTimeout(function () {
            window.scroll(0, scrollPos);
        }, 500);

        var event = new CustomEvent('setScrollPosition', { 'detail': { 'scrollPos': scrollPos } });
        document.dispatchEvent(event);

        if (bLazy != null) {
            bLazy.revalidate();
        }
    }
}

Scroll.prototype.SetPagePosition = function () {
    var topElement = document.getElementById("Top");
    var topHeight = topElement ? topElement.clientHeight : "90";
    var fullHeightItems = document.querySelectorAll('.paragraph-container--height-screen');
    fullHeightItems.forEach(function (filterItem) {
        filterItem.style.height = 'calc(100vh - ' + topHeight + 'px)';
    });

    var page = document.getElementById("Page");

    if (page.classList.contains("js-page-pos")) {
        var scrollDelay = 1;

        if (/Edge\/\d./i.test(navigator.userAgent)) {
            scrollDelay = 500;
        }

        var event = new CustomEvent('savePagePosition', { 'detail': { 'scrollPos': topHeight } });

        if (topHeight > 0) {
            page.style.marginTop = topHeight + "px";
            document.dispatchEvent(event);
        } else {
            setTimeout(function () {
                topHeight = topElement.clientHeight;
                page.style.marginTop = topHeight + "px";
                document.dispatchEvent(event);
            }, scrollDelay);
        }
    }
}

Scroll.prototype.getURLParameter = function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}


var Scroll = new Scroll();

var Search = function () { }

function debounce(method, delay) {
    var timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            method();
        }, delay);
    };
}

Search.prototype.Init = function () {
    var searchElements = document.querySelectorAll(".js-typeahead");
    var nodesArray = [].slice.call(searchElements);
    nodesArray.forEach(function (searchElement) {
        const groupsBtn           = searchElement.querySelector(".js-typeahead-groups-btn"),
              groupsContent       = searchElement.querySelector(".js-typeahead-groups-content"),
              searchField         = searchElement.querySelector(".js-typeahead-search-field"),
              searchContent       = searchElement.querySelector(".js-typeahead-search-content"),
              secondSearchContent = searchElement.querySelector(".js-typeahead-additional-search-content"),
              enterBtn            = searchElement.querySelector(".js-typeahead-enter-btn"),
              options             = {
                  pageSize:           searchElement.getAttribute("data-page-size"),
                  searchFeedId:       searchElement.getAttribute("data-search-feed-id"),
                  searchSecondFeedId: searchElement.getAttribute("data-search-second-feed-id"),
                  listId:             searchElement.getAttribute("data-list-id"),
                  resultPageId:       searchElement.getAttribute("data-result-page-id"),
                  searchType:         searchElement.getAttribute("data-search-type") || "product-search",
                  groupsPageId:       searchElement.getAttribute("data-groups-page-id"),
                  searchTemplate:     searchContent.getAttribute("data-template"),
                  saveSelectedResult: searchContent.getAttribute("data-save-selected-result")
              };
        var selectionPosition = -1;
        var listSelectionPosition = 0;

        if (groupsBtn) {
            groupsBtn.onclick = function () {
            	HandlebarsBolt.UpdateContent(groupsContent.getAttribute("id"), '/Default.aspx?ID=' + options.groupsPageId + '&feedType=' + 'productGroups' + '&redirect=false');
            }
        }

        searchField.onkeyup = debounce(function () {
            var query = searchField.value;
            selectionPosition = -1
            listSelectionPosition = 0;

            if (groupsBtn && groupsBtn.getAttribute("data-group-id") != "all" && groupsBtn.getAttribute("data-group-id") != "") {
                query += "&GroupID=" + groupsBtn.getAttribute("data-group-id");
            }

            if (query.length > 0) {
                updateContent(
                    searchContent.getAttribute("id"),
                    query,
                    options.searchFeedId,
                    (options.searchType == "combined-search" ? "product-search" : options.searchType),
                    options.searchType == "combined-search"
                );
                if (options.searchSecondFeedId) {
                    updateContent(secondSearchContent.getAttribute("id"), query, options.searchSecondFeedId, "content-search", true);
                }
                document.getElementsByTagName('body')[0].addEventListener('keydown', keyPress, false);
            } else {
                HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
                if (options.searchSecondFeedId) {
                    HandlebarsBolt.CleanContainer(secondSearchContent.getAttribute("id"));
                }
            }
        }, 500);

        function updateContent(id, query, feedId, searchType, combinedFlag) {
            HandlebarsBolt.UpdateContent(
                id,
                '/Default.aspx?ID=' + feedId +
                '&pagesize=' + options.pageSize +
                '&Search=' + query +
                (searchType == "product-search" ?
                    '&feedType=productsOnly' +
				    '&redirect=false' +
                    '&DoNotShowVariantsAsSingleProducts=True' : '') +
                (combinedFlag == true ?
                    '&searchType=combined' : '') +
                (options.listId ? '&ListID=' + options.listId : '') +
                (options.searchTemplate ? '&Template=' + options.searchTemplate : ''));
        }

        function clickedOutside(e) {
            if (searchContent.contains(e.target)) {
                document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
                return;
            }

            if (e.target != searchField && !e.target.classList.contains("js-ignore-click-outside")) {
                HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
                if (options.searchSecondFeedId) {
                    HandlebarsBolt.CleanContainer(secondSearchContent.getAttribute("id"));
                }
            }

            if (groupsBtn && e.target != groupsBtn && !groupsContent.contains(e.target)) {
                HandlebarsBolt.CleanContainer(groupsContent.getAttribute("id"));
            }

            document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
        }

        function keyPress(e) {
            const KEY_CODE = {
                LEFT:   37,
                TOP:    38,
                RIGHT:  39,
                BOTTOM: 40,
                ENTER:  13
            };

            var searchContainer = searchContent;
            var secondSearchContainer;

            if (options.searchType == "combined-search") {
                searchContainer = searchContent.querySelector("ul");
                secondSearchContainer = secondSearchContent.querySelector("ul");

                if (!searchContainer || !secondSearchContainer) {
                    return;
                }
            }

            var lists = [searchContainer, secondSearchContainer];

            if ([KEY_CODE.LEFT, KEY_CODE.TOP, KEY_CODE.RIGHT, KEY_CODE.BOTTOM].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }

            if (options.searchType == "combined-search" && e.keyCode == KEY_CODE.RIGHT && selectionPosition > -1 && listSelectionPosition == 0) {
                listSelectionPosition = 1;
                selectionPosition = 0;
            }

            if (options.searchType == "combined-search" && e.keyCode == KEY_CODE.LEFT && selectionPosition > -1 && listSelectionPosition == 1) {
                listSelectionPosition = 0;
                selectionPosition = 0;
            }

            if (e.keyCode == KEY_CODE.BOTTOM && selectionPosition < lists[listSelectionPosition].childElementCount - 1) {
                selectionPosition++;
                searchField.blur();
            }

            if (e.keyCode == KEY_CODE.TOP && selectionPosition > 0) {
                selectionPosition--;
                searchField.blur();
            }

            if (lists[listSelectionPosition].childElementCount <= 0) {
                return;
            }

            var selectedElement = lists[listSelectionPosition].children[selectionPosition];

            if (e.keyCode == KEY_CODE.TOP || e.keyCode == KEY_CODE.BOTTOM) {
                var previousSelectedElement = lists[listSelectionPosition].querySelector("li.active");
                selectElement(previousSelectedElement, selectedElement);
            }

            if (options.searchType == "combined-search" && (e.keyCode == KEY_CODE.LEFT || e.keyCode == KEY_CODE.RIGHT) && selectedElement) {
                var previousSelectedElement = lists[!listSelectionPosition - 0].querySelector(".dropdown__item.active"); //!listSelectionPosition - 0 => 1 if 0, 0 if 1
                selectElement(previousSelectedElement, selectedElement);
            }

            if (selectedElement && e.keyCode == KEY_CODE.ENTER) {
                selectedElement.click();
                document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
            }

            if (e.keyCode == KEY_CODE.ENTER) {
                if (selectedElement) {
                    getLinkBySelection(selectedElement);
                } else {
                    showSearchResults();
                }
            }
        }
        
        function selectElement(previousSelectedElement, selectedElement) {
            if (previousSelectedElement) {
                previousSelectedElement.classList.remove("active");
            }

            if (selectedElement) {
                selectedElement.classList.add("active");
                if (selectedElement.querySelector(".js-typeahead-name")) {
                    searchField.value = selectedElement.querySelector(".js-typeahead-name").innerText;
                }
                if (options.saveSelectedResult && selectedElement.querySelector(".js-typeahead-result")) {
                    searchField.setAttribute("data-result", selectedElement.querySelector(".js-typeahead-result").innerText);
                }
            }
        }

        function getLinkBySelection(selectedElement) {
            var jslink = selectedElement.querySelector(".js-typeahead-link");
            if (jslink) {
                window.location.href = jslink.getAttribute("href");
            }
        }

        function showSearchResults() {
            if (options.resultPageId) {
                window.location.href = '/Default.aspx?ID=' + options.resultPageId +
                                        '&Search=' + searchField.value +
                                        (options.listId ? '&ListID=' + options.listId : '');
            }
        }

        if (enterBtn) {
            enterBtn.onclick = showSearchResults;
        }

        document.getElementsByTagName('body')[0].addEventListener('click', clickedOutside, true);
    });
}

Search.prototype.UpdateGroupSelection = function (selectedElement) {
    const groupsContent = selectedElement.parentNode,
          groupsBtn     = groupsContent.parentNode.querySelector(".js-typeahead-groups-btn");

    groupsBtn.setAttribute("data-group-id", selectedElement.getAttribute("data-group-id"));
    groupsBtn.innerHTML = selectedElement.innerText;

    HandlebarsBolt.CleanContainer(groupsContent.getAttribute("id"));
}

Search.prototype.UpdateFieldValue = function (selectedElement) {
    const searchContent = selectedElement.parentNode,
          searchField   = searchContent.parentNode.querySelector(".js-typeahead-search-field");
    if (selectedElement) {
        if (selectedElement.querySelector(".js-typeahead-name")) {
            searchField.value = selectedElement.querySelector(".js-typeahead-name").innerText;
        }
        if (searchContent.getAttribute("data-save-selected-result") && selectedElement.querySelector(".js-typeahead-result")) {
            searchField.setAttribute("data-result", selectedElement.querySelector(".js-typeahead-result").innerText);
        }
    }

    HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
}

Search.prototype.ResetExpressSearch = function () {
    const searchField   = document.getElementById("ExpressBuyProductSearchField"),
          quantityField = document.getElementById("ExpressBuyProductCount");

    if (searchField && quantityField) {
        searchField.value = "";
        quantityField.value = "1";
        searchField.focus();
    }
}

var Search = new Search();

document.addEventListener("DOMContentLoaded", Search.Init);
function openTab(tabBlockId, tabTrigger) {
    var block = document.getElementById(tabBlockId);
    tabsName = block.getAttribute("data-tabs");
    document.querySelectorAll(".js-tab__trigger[data-tabs=" + tabsName + "]").forEach(function(trigger) {
        trigger.classList.remove("tab__trigger--active");
    });
    document.querySelectorAll(".js-tab__block[data-tabs=" + tabsName + "]").forEach(function (tab) {
        tab.classList.remove("tab__block--active");
    });
    tabTrigger.classList.add("tab__trigger--active");
    block.classList.add("tab__block--active");
}
//This code based on instructions from https://developers.google.com/youtube/iframe_api_reference

document.addEventListener("DOMContentLoaded", function () {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

});

function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.js-youtube-video').forEach(function (el) {
        var videoId = el.getAttribute('data-video');
        var elId = el.getAttribute('id');
        player = new YT.Player(elId, {
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 0,
                loop: 1,
                playlist: videoId,
                playsinline: 1,
                showinfo: 0,
                disablekb: 1,
                modestbranding: 1,
                mute: 1,
                rel: 0
            },
            events: {
                'onReady': onPlayerReady,
                'onError': onError
            }
        });
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

function onError(event) {
    event.target.a.style.display = "none";
}
var Wireframe = function () { }

var wireframeConfig = {
    cssFilesToRemove: ["rapidoCss", "igniteCss"],
    hasTemplateEngine: true,
    paragraphContainerClass: "paragraph-container",
    backgroundImageContainers: ["paragraph-container", "multiple-paragraphs-container", "layered-image", "center-container--with-background-image"],
    mediaContainers: ["google-map", "map-container", "video-wrapper"],
    hiddenClass: "u-hidden",
    visuallyHiddenClass: "u-visually-hidden",
    wireImageClass: "wire-image",
    wireBackgroundImageClass: "wire-image-lines",
    wireGrayscaleClass: "wire-grayscale",
    lightBoxImageClass: "lightbox__image",
    elementsWithColorClasses: ["u-color-warning"],
    replacementColorClass: "u-color-light-gray",
    elementsWithBackgroundColorClasses: ["u-color-warning--bg", "receipt__header"],
    replacementBackgroundColorClass: "u-color-light-gray--bg"
};

Wireframe.prototype.GetConfiguration = function () {
    if (typeof WireframeConfig == 'object') {
        wireframeConfig = WireframeConfig.Configuration();
    }
}

var _wireframeMode = false;

Wireframe.prototype.Init = function (wireframeMode) {
    _wireframeMode = wireframeMode;

    if (!wireframeMode) {
        return;
    }

    //Render as Wireframe
    document.addEventListener("DOMContentLoaded", function (event) {
        Wireframe.GetConfiguration();

        Wireframe.WireImages();

        for (var i = 0; i < wireframeConfig.cssFilesToRemove.length; i++) {
            document.getElementById(wireframeConfig.cssFilesToRemove[i]).setAttribute("href", "");
        }
        document.body.classList.remove(wireframeConfig.hiddenClass);
    });

    document.body.classList.add(wireframeConfig.hiddenClass);

    if (wireframeConfig.hasTemplateEngine == true) {
        var ajaxContainer = document.getElementsByClassName("js-handlebars-root");
        for (var i = 0; i < ajaxContainer.length; i++) {
            ajaxContainer[i].addEventListener('contentLoaded', function (e) {
                Wireframe.WireImages();
            }, false);
        }

        document.addEventListener('updateTemplate', function (e) {
            Wireframe.WireImages();
        }, false);
    }

    var event = new CustomEvent('wireframeInit');
    document.dispatchEvent(event);

}

//Render all images as 'abstract' symbolized images
Wireframe.prototype.WireImages = function () {
    if (!_wireframeMode) {
        return;
    }

    var imgElements = document.getElementsByTagName("IMG");

    for (var i = 0; i < imgElements.length; i++) {
        var imageElement = imgElements[i];

        if (!imageElement.classList.contains(wireframeConfig.hiddenClass) && !imageElement.classList.contains(wireframeConfig.lightBoxImageClass)) {
            var imageWireframe = document.createElement("DIV");
            imageWireframe.classList.add(wireframeConfig.wireImageClass);
            imageElement.parentElement.insertBefore(imageWireframe, imageElement.parentNode.firstChild);
        }

        if (imageElement.classList.contains(wireframeConfig.lightBoxImageClass)) {
            imageElement.classList.add(wireframeConfig.visuallyHiddenClass);
        }

        imageElement.classList.add(wireframeConfig.hiddenClass);
        imageElement.classList.remove("b-lazy");
    }

    for (var i = 0; i < wireframeConfig.backgroundImageContainers.length; i++) {
        var imgBgElements = document.getElementsByClassName(wireframeConfig.backgroundImageContainers[i]);

        for (var elm = 0; elm < imgBgElements.length; elm++) {
            var imgBgElement = imgBgElements[elm];

            if (imgBgElement.style.backgroundImage != "") {
                imgBgElement.setAttribute("style", "");
                imgBgElement.classList.add(wireframeConfig.wireBackgroundImageClass);
            }
        }
    }

    var imgBgElements = document.getElementsByClassName(wireframeConfig.paragraphContainerClass);

    for (var i = 0; i < imgBgElements.length; i++) {
        var imgBgElement = imgBgElements[i];

        if (imgBgElement.getAttribute("style") != "") {
            imgBgElement.setAttribute("style", "");
            imgBgElement.classList.add(wireframeConfig.wireBackgroundImageClass);
        }
    }

    for (var i = 0; i < wireframeConfig.mediaContainers.length; i++) {
        var mediaElement = document.getElementsByClassName(wireframeConfig.mediaContainers[i]);

        for (var elm = 0; elm < mediaElement.length; elm++) {
            mediaElement[elm].classList.add(wireframeConfig.wireGrayscaleClass);
        }
    }

    for (var i = 0; i < wireframeConfig.elementsWithColorClasses.length; i++) {
        var colorElement = document.querySelectorAll("." + wireframeConfig.elementsWithColorClasses[i]);
        var colorClass = wireframeConfig.elementsWithColorClasses[i];

        for (var elm = 0; elm < colorElement.length; elm++) {
            var warningElement = colorElement[elm];

            warningElement.classList.remove(colorClass);
            warningElement.classList.add(wireframeConfig.replacementColorClass);
        }
    }

    for (var i = 0; i < wireframeConfig.elementsWithBackgroundColorClasses.length; i++) {
        var colorElement = document.querySelectorAll("." + wireframeConfig.elementsWithBackgroundColorClasses[i]);
        var colorClass = wireframeConfig.elementsWithBackgroundColorClasses[i];

        for (var elm = 0; elm < colorElement.length; elm++) {
            var warningElement = colorElement[elm];

            console.log(elm); //??

            warningElement.classList.remove(colorClass);
            warningElement.classList.add(wireframeConfig.replacementBackgroundColorClass);
        }
    }

    var responsiveImages = document.getElementsByClassName("responsive-image");

    for (var i = 0; i < responsiveImages.length; i++) {
        responsiveImages[i].classList.remove("responsive-image--1-1");
        responsiveImages[i].classList.remove("responsive-image--16-9");
        responsiveImages[i].classList.remove("responsive-image--4-3");
    }
}

var Wireframe = new Wireframe();
var WireframeConfig = function () { }

WireframeConfig.prototype.Configuration = function () {
    var wireframeConfigObject = {
        cssFilesToRemove: ["rapidoCss", "igniteCss"],
        hasDynamo: true,
        backgroundImageContainers: ["paragraph-container", "multiple-paragraphs-container", "layered-image", "center-container--with-background-image"],
        mediaContainers: ["google-map", "map-container", "video-wrapper"],
        hiddenClass: "u-hidden",
        visuallyHiddenClass: "u-visually-hidden",
        wireImageClass: "wire-image",
        wireBackgroundImageClass: "wire-image-lines",
        wireGrayscaleClass: "wire-grayscale",
        lightBoxImageClass: "lightbox__image",
        elementsWithColorClasses: ["u-color-warning"],
        replacementColorClass: "u-color-light-gray",
        elementsWithBackgroundColorClasses: ["u-color-warning--bg", "receipt__header"],
        replacementBackgroundColorClass: "u-color-light-gray--bg"
    };

  return wireframeConfigObject;
}

var WireframeConfig = new WireframeConfig();