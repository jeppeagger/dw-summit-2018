
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