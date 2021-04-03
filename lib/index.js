"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBusEvent = exports.subscribe = exports.init = exports.functions = exports.initBus = exports.addIFrame = exports.mfList = exports.Greeter = void 0;
var Greeter = function (name) { return console.log("Hello " + name); };
exports.Greeter = Greeter;
exports.mfList = [];
var addIFrame = function (key) {
    exports.mfList.push(key);
    var frame = document.getElementById(key);
    frame.onload = function () {
        frame.contentWindow.frameId = key;
        frame.contentWindow.addEventListener("frame-bus-event", function (e) {
            document.dispatchEvent(new CustomEvent("master-event", { detail: e.detail }));
        });
    };
};
exports.addIFrame = addIFrame;
var initBus = function () {
    document.addEventListener('master-event', function (e) {
        exports.mfList.forEach(function (key) {
            if (e.detail.source != key)
                document.getElementById(key).contentWindow.dispatchEvent(new CustomEvent("micro-frontend-bus", { detail: e.detail }));
        });
    });
};
exports.initBus = initBus;
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
