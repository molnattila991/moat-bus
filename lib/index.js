"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBusEvent = exports.subscribe = exports.init = exports.functions = exports.createBusEventMaster = exports.unsubscribeMaster = exports.subscribeMaster = exports.initBus = exports.removeIFrame = exports.addIFrame = exports.subs = exports.mfList = void 0;
exports.mfList = [];
exports.subs = [];
var addIFrame = function (key) {
    var item = exports.mfList.find(function (i) { return i == key; });
    if (item) {
    }
    else {
        exports.mfList.push(key);
        var frame_1 = document.getElementById(key);
        frame_1.onload = function () {
            frame_1.contentWindow.frameId = key;
            frame_1.contentWindow.addEventListener("frame-bus-event", function (e) {
                document.dispatchEvent(new CustomEvent("master-event", { detail: e.detail }));
            });
        };
    }
};
exports.addIFrame = addIFrame;
var removeIFrame = function (key) {
    var item = exports.mfList.findIndex(function (i) { return i == key; });
    if (item != -1) {
        exports.mfList.splice(item, 1);
    }
};
exports.removeIFrame = removeIFrame;
var initBus = function () {
    document.addEventListener('master-event', function (e) {
        exports.mfList.forEach(function (key) {
            if (e.detail.source != key)
                document.getElementById(key).contentWindow.dispatchEvent(new CustomEvent("micro-frontend-bus", { detail: e.detail }));
        });
        exports.subs.forEach(function (item) {
            if (e.detail.eventKey == item.eventKey) {
                item.func(e.detail.data);
            }
        });
    });
};
exports.initBus = initBus;
var subscribeMaster = function (eventKey, func) {
    var item = exports.subs.findIndex(function (i) { return i == eventKey; });
    if (item == -1) {
        exports.subs.push({
            eventKey: eventKey,
            func: func
        });
    }
};
exports.subscribeMaster = subscribeMaster;
var unsubscribeMaster = function (eventKey) {
    var item = exports.subs.findIndex(function (i) { return i == eventKey; });
    if (item != -1) {
        exports.subs.splice(item, 1);
    }
};
exports.unsubscribeMaster = unsubscribeMaster;
var createBusEventMaster = function (eventKey, data) {
    exports.mfList.forEach(function (key) {
        document.getElementById(key).contentWindow.dispatchEvent(new CustomEvent("micro-frontend-bus", {
            detail: {
                source: "shell-frame",
                data: data,
                eventKey: eventKey
            }
        }));
    });
};
exports.createBusEventMaster = createBusEventMaster;
/////////CLIENT/////////////
exports.functions = [];
var init = function () {
    window.addEventListener("micro-frontend-bus", function (e) {
        exports.functions.forEach(function (f) {
            if (f.key == e.detail.eventKey) {
                f.function(e.detail.data);
            }
        });
    });
};
exports.init = init;
var subscribe = function (name, func) {
    exports.functions.push({ key: name, function: func });
};
exports.subscribe = subscribe;
var createBusEvent = function (eventKey, data) {
    if (data === void 0) { data = "test-data"; }
    window.dispatchEvent(new CustomEvent("frame-bus-event", {
        detail: {
            source: window.frameId,
            data: data,
            eventKey: eventKey
        }
    }));
};
exports.createBusEvent = createBusEvent;
