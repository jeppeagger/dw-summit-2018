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