/// <reference types="next" />

// CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

// Regular CSS imports
declare module '*.css' {
  const content: any
  export default content
}
