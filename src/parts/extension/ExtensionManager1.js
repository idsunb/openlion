import React from "react";
import { getATest } from "../../workspace/extension/extension";



const ExtensionManager = () => {


    return (
        <div>
            {getATest()}
        </div>
    );
}


export default ExtensionManager;