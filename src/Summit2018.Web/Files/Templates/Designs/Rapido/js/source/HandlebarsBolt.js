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