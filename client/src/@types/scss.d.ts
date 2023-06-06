declare module '*.scss' {
  interface ClassNamesInterface {
    [className: string]: string;
  }
  const classNames: ClassNamesInterface;
  export = classNames;
}
