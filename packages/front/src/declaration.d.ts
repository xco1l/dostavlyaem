// It's necessary to import .png files in components
declare module '*.png' {
  const value: any;
  export = value;
}
