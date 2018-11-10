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
