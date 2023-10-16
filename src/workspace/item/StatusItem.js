
import DisposableItem from "./DisposableItem";
import { openlion } from "../lionAPI/openlion";



class StatusItem extends DisposableItem {
    constructor(alignment, priority=0, id) {
        console.log('StatusItem constructor',alignment,priority,id);
        super();
        this._text = '';
        this._tooltip = '';
        this._command = '';
        this._color = '';
        this._icon = '';
        this._priority = priority;
        this._alignment = alignment;
        this._visible = false;
        this._id = id;

    }

    set text(text) {
        this._text = text;
    }

    set tooltip(tooltip) {
        this._tooltip = tooltip;
    }

    set command(command) {
        this._command = command;
    }

    set color(color) {
        this._color = color;
    }

    set icon(icon) {
        this._icon = icon;
    }

    set priority(priority) {
        this._priority = priority;
    }


    get text() {
        return this._text;
    }

    get tooltip() {
        return this._tooltip;
    }

    get command() {
        return this._command;
    }

    get color() {
        return this._color;
    }

    get icon() {
        return this._icon;
    }

    get priority() {
        return this._priority;
    }




    get alignment() {
        return this._alignment;
    }

    show = () => {
        openlion.lionCommand.call({name:'statusbar.updatetab',args:{id:this._id, text:this.text,tooltip:this.tooltip,command:this.command,color:this.color,icon:this.icon,priority:this.priority,alignment:this.alignment,visible:true}});
    }

    hide = () => {
        openlion.lionCommand.call({name:'statusbar.updatetab',args:{id:this._id, text:this.text,tooltip:this.tooltip,command:this.command,color:this.color,icon:this.icon,priority:this.priority,alignment:this.alignment,visible:false}});
    }


    dispose = () => {
        openlion.lionCommand.call({name:'statusbar.removetab',args:{id:this._id,alignment:this.alignment}});
    }



}


export default StatusItem;
