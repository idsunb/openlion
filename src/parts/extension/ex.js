
import React,{useState,useEffect} from "react";
import { createRoot } from 'react-dom/client';
import Styles from "./ExtensionPanel.module.css";
import { extensions } from "./Extensions";
// import { extensions } from './Extensions'
// import openlion from '../../../src/workspace/lionAPI/openlion';




// import * as fs from 'node:fs';

// import { loadPyodide } from "pyodide";

// const module  = await import("C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension2\\extension.js")



// async function main() {
//     let pyodide = await loadPyodide();
//     // Pyodide is now ready to use...
//     console.log(pyodide.runPython(`
//       import sys
//       sys.version
//       print(1 + 2000000000000000000)
//     `));
//   };
//   main();






const container = document.getElementById('root');
const root = createRoot(container);



const getInit = () => {
    const exlist ={}

    //得到所有插件的名字，初始化为false
    const exs = extensions.getAllExtensions()
    // console.log('AllExtensions',exs)
    for (const key in exs) {
        exlist[key] = { name: exs[key].name, active: false }
    }
    return exlist;

}



const Manager = () => {

    const savedState = localStorage.getItem('ExtensionPanel');
    //如果 有savedstate,则把savedstate的结果和 getInit的结果合并，如果没有，则直接使用getInit的结果
    const [exlist, setexlist] = useState(savedState ? {...getInit(),...JSON.parse(savedState)} : getInit());
    
    



    // const [exlist, setexlist] = useState(savedState ? JSON.parse(savedState) : getInit());

        //创一个插件管理器，用来管理插件的安装，卸载，启用，禁用，更新，每一个插件为一项，有一个标签，是enable，如果按下的时候，变成disable，再按一下，变回来，悬停的时候变成浅灰，和程序总体主题一致
    //按钮需要在右下角，颜色暗灰色，悬停的时候变成浅灰色，和程序总体主题一致
    const loadInit = async () => {
        for (const key in exlist) {
            if (exlist[key].active) {
                    //如果激活错误 则关闭插件
                    const error = await extensions.enable(key);
                    if(error){
                        console.warn("插件激活错误:", error)
                        setexlist({ ...exlist, [key]: { ...exlist[key], active: false } })
                        extensions.disable(key);
                    }
            }
        }   
    }


    useEffect(() => {
        //暂时使用，todo
        loadInit();

            // 使用 window.onload 事件
    },[]);


    useEffect(() => {
        localStorage.setItem('ExtensionPanel', JSON.stringify(exlist));
    }, [exlist]);


    
    const handleOnActive = async (e) => {
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
            //如果错误,则不激活
            const error = await extensions.enable(name);
            if(error){
                console.error("插件激活错误:", error)
                setexlist({ ...exlist, [name]: { ...exlist[name], active: false } })

                return
            }
            //如果没有错误,则激活
            setexlist({ ...exlist, [name]: { ...exlist[name], active: true } })
        }
        if (labContent == "disable") {
            extensions.disable(name);
            setexlist({ ...exlist, [name]: { ...exlist[name], active: false } })
        }

    }


    
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
                    

    )

}

root.render(<Manager />)










