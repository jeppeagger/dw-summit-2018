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