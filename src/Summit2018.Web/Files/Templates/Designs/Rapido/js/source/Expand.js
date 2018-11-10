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