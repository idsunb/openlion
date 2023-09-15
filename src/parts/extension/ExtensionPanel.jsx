import React, { useEffect,useState } from "react";
import { scanPath } from "./extensionManager";
import openlion from "../../workspace/lionAPI/openlion";
import { extensions } from "./Extensions";

import Styles from "./ExtensionPanel.module.css";
import { set } from "lodash";
console.log("🚀 ~ file: ExtensionPanel.jsx:5 ~ lionExtensions:", extensions)


// const activelist ={"name":{name:"",active:true}}

const getInit = () => {
    const exlist ={}

    //得到所有插件的名字，初始化为false
    const exs = extensions.getAllExtensions()
    for (const key in exs) {
        exlist[key] = { name: exs[key].name, active: false }
    }
    return exlist;

}



const ExtensionPanel = () => {
    // const [exs, setexs] = useState(extensions.extensions);

    const savedState = localStorage.getItem('ExtensionPanel');

    const [exlist, setexlist] = useState(savedState ? JSON.parse(savedState) : getInit());

    const loadInit = async () => {
        for (const key in exlist) {
            if (exlist[key].active) {
                extensions.enable(key);
            }
        }   
    }


    useEffect(() => {
        //暂时使用，todo
        // console.log("exlist", exlist)
        loadInit();

            // 使用 window.onload 事件
    },[]);


    useEffect(() => {
        localStorage.setItem('ExtensionPanel', JSON.stringify(exlist));
    }, [exlist]);


    const handleOnActive = (e) => {
        const labContent = e.target.textContent;
        const name = e.target.id;
        // if(labContent == "enable"){
        
        //     setexs({...exs,[e.target.id]:{...exs[e.target.id],active:true}})
        //     extensions.enable(e.target.id);
            


        // }
        // if (labContent == "disable") {
        //     setexs({...exs,[e.target.id]:{...exs[e.target.id],active:false}})
        //     extensions.disable(e.target.id);
        // }
        if (labContent == "enable") {
            setexlist({ ...exlist, [name]: { ...exlist[name], active: true } })
            extensions.enable(name);
        }
        if (labContent == "disable") {
            setexlist({ ...exlist, [name]: { ...exlist[name], active: false } })
            extensions.disable(name);
        }

    }




    // const [lionExtensions, setLionExtensions] = useState({extensions:{}});
    // useEffect(() => {
    //创一个插件管理器，用来管理插件的安装，卸载，启用，禁用，更新，每一个插件为一项，有一个标签，是enable，如果按下的时候，变成disable，再按一下，变回来，悬停的时候变成浅灰，和程序总体主题一致
    //按钮需要在右下角，颜色暗灰色，悬停的时候变成浅灰色，和程序总体主题一致
    
    
    return (

        <div className={Styles.extensionpanel}>
            {Object.keys(exlist).map((key) => {
                const {name,title,description} = extensions.getExtension(key);
                return (
                    <div key={key} className={Styles.extensionitem}>
                        <div>{name}</div>
                        <div>{title}</div>
                        <div>{description}</div>
                        <div className={Styles.switchContainer} >
                            <label id={key} className={Styles.switch} onClick={handleOnActive}>{exlist[key].active ? "disable" : "enable"}</label>
                        </div>
                    </div>
                );
            })}
        </div>
                    




    );

}


export default ExtensionPanel;