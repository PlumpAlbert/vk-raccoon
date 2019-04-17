export const Log = (componentName: string) => {
  return (...args: any[]) => {
    args.push(new Date(Date.now()).toLocaleTimeString());
    console.log.apply(console, [`@${componentName} >`, ...args]);
  };
};
export const infoLog = (componentName: string) => {
  return (...args: any[]) => {
    args.push(new Date(Date.now()).toLocaleTimeString());
    console.info.apply(console, [`@${componentName} >`, ...args]);
  };
};
export const errorLog = (componentName: string) => {
  return (...args: any[]) => {
    args.push(new Date(Date.now()).toLocaleTimeString());
    console.error.apply(console, [`@${componentName} >`, ...args]);
  };
};
