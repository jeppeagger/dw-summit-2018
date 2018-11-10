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