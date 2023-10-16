import React, { useState, useEffect } from "react";
import EditableComponent from "./EditableComponent";
import fs from 'fs';
import path from 'path';
import { openlion } from '../../workspace/lionAPI/openlion';








const If = ({ condition, children, action }) => {

    const execute = (condition) => {
        if (condition) {
            return console.log('condition is true');
        }
    };

    function execute2(condition) {
        if (condition) {
            return console.log('condition is true');
        }
    }

    if (action) {
        console.log('action', action);
        if (condition) {
            return action()
        }
    }
    return children

};


const Test = () => {
    const a = 333;
    return 3333333
}


console.log('a', If({ condition: 1, action: Test }));







const ActionPanel = () => {
    const actionPath = path.join("C:/Users/Administrator/AppData/Roaming/openlion/actions", 'component.jsx');


    const [component, setComponent] = useState(() => {
        console.log('actionPath', actionPath);

        let savedComponent;
        try {
            savedComponent = fs.readFileSync(actionPath, 'utf-8');
            return savedComponent;
        } catch (err) {
            savedComponent = '<h1>Hello, world!</h1>';
            return savedComponent;
        }


    });

    const [name, setName] = useState('World');


    const handleSave = (value) => {
        setComponent(value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
      };


    useEffect(() => {


        //可以把函数串行执行,并且可以传递参数,tasks和args都是数组，globalVariable是全局变量，argGlobalMap是参数和全局变量的映射
        const serial = (tasks,args,globalVariable,argGlobalMap) => {
       




                        const result = [];
            const promise = tasks.reduce((prev, next) => {
                return prev.then(next).then((data) => {
                    console.log('data',next,data);
                    result.push(data);
                    return result;
                });
            }, Promise.resolve());
            return promise;
        }


        //可以把函数组并行执行
        const parallel = (tasks,args,globalVariable,argGlobalMap) => {
            const result = [];
            const promise = Promise.all(tasks.map((task) => {
                return task();
            }
            ))
            return promise;

        }





        const invokeCommand = (input, output) => {
            console.log('invokeCommand', input, output);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(output);
                }, 1000);
            });
        }

        // const command = openlion.lionCommand.call('actionpanel.command1', {input: [globalVariable.a], output: [globalVariable.b]});

        let globalVariable = {a:1,b:2,c:3};
        openlion.lionCommand.register({name:'actionpanel.command1', action:(globalVariable) => {console.log('actionpanel.command1',globalVariable.a);return 991}});
        openlion.lionCommand.register({name:'actionpanel.command2', action:() => {console.log('actionpanel.command2');return "haha"}});
        openlion.lionCommand.register({name:'actionpanel.command3', action:() => {console.log('actionpanel.command33');return 3}});

        const command1 = ()=>{return openlion.lionCommand.call('actionpanel.command1',globalVariable)};
        const command2 = ()=>{return openlion.lionCommand.call('actionpanel.command2',globalVariable)};
        const command3 = ()=>{return openlion.lionCommand.call('actionpanel.command3',globalVariable)};



        // setTimeout(async () => {
        // console.log('command1xxx',Promise.resolve().then(command2).then(data => {console.log('command2',data)}));
        // // console.log('xxxxxxxxxxxxx2',command2);

        // }, 1000);

// 并行执行多个命令
parallel([command1, command2, command3]).then((results) => {
// 处理命令的结果
console.log('result',results);

});

  
  //串行执行多个命令
//   serial([command1, command2, command3]).then((results) => {
//     // 处理命令的结果
//     console.log('result',results);

//     });

    // let job1 = new Promise((resolve, reject) => {
    //     resolve("result from job1");
    // });
    
    // let job2 = (resultFromJob1) => {
    //     console.log(resultFromJob1);
    //     return "result from job2";
    // };
    
    // let job3 = (resultFromJob2) => {
    //     console.log(resultFromJob2);  // 输出 "result from job2"
    // };

    // console.log('xxxxxxxxxxxx',Promise.resolve(1).then(job2).then(job3));



    }, []);




    useEffect(() => {
        fs.writeFileSync(actionPath, component);
    }, [component]);

    return <div>action

        <If condition={1} >
            <div >No results</div>
        </If>
        <EditableComponent component={component.replace('{name}', name)} onSave={handleSave} />
        <input type="text" value={name} onChange={handleNameChange} />

    </div>;

}

export default ActionPanel;