


export const utils = {
    
    chekDependency: (names=[]) => {
        //得到所有的依赖,从存在localStorage中的激活情况中得到,对比,返回{[name]:true,[name]:false}的形式
        try{
        const all = localStorage.getItem('ExtensionPanel');
        const allObj = JSON.parse(all);
        if(names.length != 0){
        const result = names.reduce((pre,cur)=>{
            //检查属性是否存在,否则报错
            if(allObj[cur]){
                pre[cur] = allObj[cur].active
                return pre;
            }else{
                pre[cur] = false;
                return pre;
            }
        },{})
        return  result;
    }
    }catch(e){
        console.warn("检查依赖错误:",e)
    }

    },
    



}


