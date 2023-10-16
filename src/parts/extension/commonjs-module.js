async function dynamicImportExample(variableName) {
    // 使用动态导入语法，在异步函数中加载模块
    const dynamicModule = await import(variableName);
    
    // 访问动态导入的模块
    console.log(dynamicModule);
  }
  
  // 导出函数
  module.exports = dynamicImportExample;