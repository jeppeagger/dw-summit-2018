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