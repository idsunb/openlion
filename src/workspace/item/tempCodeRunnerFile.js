
import { stat } from "original-fs";
import DisposableItem from "./DisposableItem";

class StatusItem extends DisposableItem {
    constructor() {
        super();
        this._isDisposed = false;
    }

    dispose() {
        this._isDisposed = true;
    }

    get isDisposed() {
        return this._isDisposed;
    }
}


export default StatusItem;

const s = new StatusItem();
s.dispose();