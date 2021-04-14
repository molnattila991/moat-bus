export const mfList: any = [];
export const subs: any = [];

export const addIFrame = (key: any) => {
    var item = mfList.find((i: string) => i == key);
    if (item) {

    } else {
        mfList.push(key);

        let frame: any = document.getElementById(key);

        frame.onload = function () {
            frame.contentWindow.frameId = key;
            frame.contentWindow.addEventListener("frame-bus-event", (e: any) => {
                document.dispatchEvent(new CustomEvent("master-event", { detail: e.detail }));
            });
        };
    }
}

export const removeIFrame = (key: any) => {
    var item = mfList.findIndex((i: string) => i == key);
    if (item != -1) {
        mfList.splice(item, 1);
    }
}

export const initBus = () => {
    document.addEventListener('master-event', (e: any) => {
        mfList.forEach((key: any) => {
            if (e.detail.source != key)
                (<any>document.getElementById(key)).contentWindow.dispatchEvent(new CustomEvent("micro-frontend-bus", { detail: e.detail }));
        });

        subs.forEach((item: any) => {
            if (e.detail.eventKey == item.eventKey) {
                item.func(e.detail.data);
            }
        });
    });
}

export const subscribeMaster = (eventKey: any, func: any) => {
    var item = subs.findIndex((i: string) => i == eventKey);
    if (item == -1) {
        subs.push({
            eventKey,
            func
        });
    }
}

export const unsubscribeMaster = (eventKey: string) => {
    var item = subs.findIndex((i: string) => i == eventKey);
    if (item != -1) {
        subs.splice(item, 1);
    }
}

export const createBusEventMaster = (eventKey: string, data: any) => {
    mfList.forEach((key: any) => {
        (<any>document.getElementById(key)).contentWindow.dispatchEvent(
            new CustomEvent("micro-frontend-bus", {
                detail:
                {
                    source: "shell-frame",
                    data,
                    eventKey: eventKey
                }
            }
            ));
    });
}