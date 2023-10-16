
import React,{useEffect} from "react";
await import("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js")

async function main(){
    let pyodide = await loadPyodide();
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install("chromadb");
    console.log(pyodide.runPython(
        `
print("Hello from Python!")

        
        `


    ));
  }
  main();

  

const Pytest1 = () => {

    useEffect(()=>{
        //创建一个py-script标签




    },[])


    return (
        <div>
            <h1>PyScript Events</h1>
            <div>
                <button id="change_me"> Press me ! </button>
            </div>

            <input type="color" id="color-picker" />
            <div id="text" >Hello World!</div>


            <h1>pytest world</h1>
            {/* <py-repl id="my-repl" auto-generate={true}> </py-repl> */}


        </div>
    )
}


export default Pytest1;
