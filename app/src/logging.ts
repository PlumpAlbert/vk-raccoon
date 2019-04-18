export const Log = (componentName: string) => {
  return (...args: any[]) => {
    console.log.apply(console, [
      `%c${componentName} @ ${new Date(Date.now()).toLocaleTimeString()} >`, 'color: MIDNIGHTBLUE',
      ...args
    ]);
  };
};
export const infoLog = (componentName: string) => {
  return (...args: any[]) => {
    args.push(new Date(Date.now()).toLocaleTimeString());
    console.info.apply(console, [
      `%c${componentName} @ ${new Date(Date.now()).toLocaleTimeString()} >`, 'color: DEEPSKYBLUE',
      ...args
    ]);
  };
};
export const errorLog = (componentName: string) => {
  return (...args: any[]) => {
    args.push(new Date(Date.now()).toLocaleTimeString());
    console.error.apply(console, [
      `%c${componentName} @ ${new Date(Date.now()).toLocaleTimeString()} >`, 'color: CRIMSON',
      ...args
    ]);
  };
};
