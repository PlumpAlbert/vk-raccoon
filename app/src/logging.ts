const createLog = (componentName: string) => {
  return (...args: any[]) => {
    args.push(new Date(Date.now()).toLocaleTimeString());
    console.log.apply(console, [`@${componentName} >`, ...args]);
  }
}
export default createLog;
