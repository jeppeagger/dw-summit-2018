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
