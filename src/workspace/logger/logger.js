class Logger {
    constructor(name) {
      this.name = name;
      this.channel = null;
    }
  
    createChannel() {
      if (!this.channel) {
        this.channel = window.createOutputChannel(this.name);
      }
    }
  
    log(message) {
      this.createChannel();
      this.channel.appendLine(`[LOG] ${message}`);
    }
  
    warn(message) {
      this.createChannel();
      this.channel.appendLine(`[WARN] ${message}`);
    }
  
    error(message) {
      this.createChannel();
      this.channel.appendLine(`[ERROR] ${message}`);
    }
  
    clear() {
      if (this.channel) {
        this.channel.clear();
      }
    }
  }


//   const logger = new Logger('My Extension');

// logger.log('Hello, world!');
// logger.warn('Something went wrong!');
// logger.error('An error occurred!');
// // 创建一个输出通道
// const channel = vscode.window.createOutputChannel('My Extension');
