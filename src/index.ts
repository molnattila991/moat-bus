export const Greeter = (name: string) => console.log(`Hello ${name}`); 

export const mfList:any = [];

export const addIFrame = (key:any) => {
    mfList.push(key);

    let frame:any = document.getElementById(key);
    
    frame.onload = function() {
        frame.contentWindow.frameId = key;
        frame.contentWindow.addEventListener("frame-bus-event", (e:any)=>{
            document.dispatchEvent(new CustomEvent("master-event", {detail: e.detail}));
        });
    };
}

export const initBus = ()=>{
    document.addEventListener('master-event', (e:any)=>{
        mfList.forEach((key:any)=>{
            if(e.detail.source != key)
                (<any>document.getElementById(key)).contentWindow.dispatchEvent(new CustomEvent("micro-frontend-bus", {detail: e.detail}));
        });
    });
}

export const functions: any = [];

export const init = () =>{
    window.addEventListener("micro-frontend-bus", (e:any)=>{
        functions.forEach((f:any)=>{
            if(f.key == e.detail.eventKey) {
                f.function(e.detail.data);
            }
        });
    });
}

export const subscribe = (name:any, func:any) => {
    functions.push({key: name, function: func});
}

export const createBusEvent = (eventKey:any, data = "test-data") => {
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