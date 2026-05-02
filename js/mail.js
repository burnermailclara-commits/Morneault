let r;
var s = (o) => {
    if (!r) {
        const n = o.forwardRef(({color: i = "currentColor", size: e = 24, ...t}, l) => {
            return o.createElement("svg", {ref: l, xmlns: "http://www.w3.org/2000/svg", width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: i, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...t}, o.createElement("path", {d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}), o.createElement("polyline", {points: "22,6 12,13 2,6"}));
        });
        n.displayName = "Mail",r = n;
    }
    return r;
};
const __FramerMetadata__ = {exports: {default: {type: "reactComponent", slots: [], annotations: {framerContractVersion: "1"}}, __FramerMetadata__: {type: "variable"}}};
export { __FramerMetadata__, s as default };