declare module '*.module.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}



declare module '*.jpg'
declare module '*.mp3'
declare module '*.svg'
