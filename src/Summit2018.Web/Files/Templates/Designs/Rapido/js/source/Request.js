function Request() {}

Request.prototype.newRequest = function (url, method, data, successCallback, errorCallback, returnJson) {
    if (returnJson == null) {
        returnJson = true;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        function error(message) {
            console.warn(message);

            if (typeof errorCallback == "function") {
                errorCallback(this.response);
            }
        }

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var data;

            if (this.responseType === 'json') {
                data = this.response.message.trim();
            } else {
                data = this.response.trim();
            }

            if (returnJson) {
                if (data == "") {
                    console.warn(url + ": Response is empty");
                    data = {};
                } else if (data.indexOf("<") == 0) {
                    error(url + ": URL returned HTML instead of JSON");
                    return;
                } else {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        error(url + ": Could not parse the JSON data");
                        return;
                    }
                }
            }

            if (typeof successCallback == "function") {
                successCallback(data);
            }
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
            error(url + ": XMLHttpRequest failed");
        }
    };

    xhr.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
    xhr.setRequestHeader('cache-control', 'max-age=0');
    xhr.setRequestHeader('expires', '0');
    xhr.setRequestHeader('expires', 'Tue, 01 Jan 1980 1:00:00 GMT');
    xhr.setRequestHeader('pragma', 'no-cache');

    if (data) { 
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
};

Request.prototype.Fetch = function () {
    var self = this;

    return {
        get: function (url, successCallback, errorCallback, returnJson) {
            self.newRequest(url, "GET", null, successCallback, errorCallback, returnJson);
        },

        post: function (url, data, successCallback, errorCallback, returnJson) {
            self.newRequest(url, "POST", data, successCallback, errorCallback, returnJson);
        }
    };
};

var Request = new Request();