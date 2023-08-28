import React, { useEffect,useState } from "react";
import { installAllExtensions } from "../../workspace/extension/extension";
import { lionContext } from "../../workspace/context/lionContext";
import openlion from "../../workspace/lionAPI/openlion";

lionContext.setState({a:1})

console.log('lioncontext.....',lionContext.getState());




const ExtensionManager = () => {



    useEffect(() => {
        //暂时使用，todo
        setTimeout(() => {
            installAllExtensions()

        }, 500);

            // 使用 window.onload 事件
    },[]);



    return (
        // isAppLoaded &&(

        <div>
            {/* {getATest()} */}

        </div>
        // )
    );
}


export default ExtensionManager;