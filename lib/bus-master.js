export var mfList = [];
export var subs = [];
export var addIFrame = function (key) {
    var item = mfList.find(function (i) { return i == key; });
    if (item) {
    }
    else {
        mfList.push(key);
        var frame_1 = document.getElementById(key);
        frame_1.onload = function () {
            frame_1.contentWindow.frameId = key;
            frame_1.contentWindow.addEventListener("frame-bus-event", function (e) {
                document.dispatchEvent(new CustomEvent("master-event", { detail: e.detail }));
            });
        };
    }
};
export var removeIFrame = function (key) {
    var item = mfList.findIndex(function (i) { return i == key; });
    if (item != -1) {
        mfList.splice(item, 1);
    }
};
export var initBus = function () {
    document.addEventListener('master-event', function (e) {
        mfList.forEach(function (key) {
            if (e.detail.source != key)
                document.getElementById(key).contentWindow.dispatchEvent(new CustomEvent("micro-frontend-bus", { detail: e.detail }));
        });
        subs.forEach(function (item) {
            if (e.detail.eventKey == item.eventKey) {
                item.func(e.detail.data);
            }
        });
    });
};
export var subscribeMaster = function (eventKey, func) {
    var item = subs.findIndex(function (i) { return i == eventKey; });
    if (item == -1) {
        subs.push({
            eventKey: eventKey,
            func: func
        });
    }
};
export var unsubscribeMaster = function (eventKey) {
    var item = subs.findIndex(function (i) { return i == eventKey; });
    if (item != -1) {
        subs.splice(item, 1);
    }
};
export var createBusEventMaster = function (eventKey, data) {
    mfList.forEach(function (key) {
        document.getElementById(key).contentWindow.dispatchEvent(new CustomEvent("micro-frontend-bus", {
            detail: {
                source: "shell-frame",
                data: data,
                eventKey: eventKey
            }
        }));
    });
};
