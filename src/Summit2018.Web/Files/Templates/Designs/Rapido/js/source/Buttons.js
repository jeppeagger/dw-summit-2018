var Buttons = function () { }

Buttons.prototype.LockButton = function (e) {
    var allIsOk = true;
    var clickedButton = e.currentTarget;

    if (clickedButton.type == "submit") {
        var formElement = clickedButton.closest("form"),
            inputs = formElement.getElementsByTagName("INPUT"),
            textareas = formElement.getElementsByTagName("TEXTAREA"),
            fields = Array.prototype.slice.call(inputs).concat(Array.prototype.slice.call(textareas));
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].validity.valid == false) {
                allIsOk = false;
            }
        }
    }

    //Secure that there is time for a form time to submit
    if (allIsOk) {
        return;
    }

    setTimeout(function () {
        var clickedButtonText = clickedButton.innerHTML;
        var clickedButtonWidth = clickedButton.clientWidth;
        clickedButton.classList.add("disabled");
        clickedButton.disabled = true;
        clickedButton.innerHTML = "";
        clickedButton.innerHTML = "<i class=\"fas fa-circle-notch fa-spin\"></i>";
        clickedButton.style.width = clickedButtonWidth + "px";

        var event = new CustomEvent('buttonIsLocked');
        document.dispatchEvent(event);
        clickedButton.dispatchEvent(event);
    }, 50);
}

var Buttons = new Buttons();