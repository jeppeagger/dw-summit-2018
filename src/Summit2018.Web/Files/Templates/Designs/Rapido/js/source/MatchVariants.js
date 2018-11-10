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