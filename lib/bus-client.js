export var functions = [];
export var init = function () {
    window.addEventListener("micro-frontend-bus", function (e) {
        functions.forEach(function (f) {
            if (f.key == e.detail.eventKey) {
                f.function(e.detail.data);
            }
        });
    });
};
export var subscribe = function (name, func) {
    functions.push({ key: name, function: func });
};
export var connectedToBus = function () {
    return window.frameId != undefined;
};
export var createBusEvent = function (eventKey, data) {
    if (data === void 0) { data = "test-data"; }
    window.dispatchEvent(new CustomEvent("frame-bus-event", {
        detail: {
            source: window.frameId,
            data: data,
            eventKey: eventKey
        }
    }));
};
