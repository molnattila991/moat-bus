
export const functions: any = [];

export const init = () => {
    window.addEventListener("micro-frontend-bus", (e: any) => {
        functions.forEach((f: any) => {
            if (f.key == e.detail.eventKey) {
                f.function(e.detail.data);
            }
        });
    });
}

export const subscribe = (name: any, func: any) => {
    functions.push({ key: name, function: func });
}

export const connectedToBus = () => {
    return (<any>window).frameId != undefined;
}

export const createBusEvent = (eventKey: any, data: any = "test-data") => {
    window.dispatchEvent(
        new CustomEvent("frame-bus-event",
            {
                detail: {
                    source: (<any>window).frameId,
                    data,
                    eventKey: eventKey
                }
            })
    )
}