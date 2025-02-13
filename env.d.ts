
interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_ENV: 'development' | 'production' | 'test'
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
  declare const process: {
    env: {
      NODE_ENV: 'development' | 'production' | 'test'
      [key: string]: string | undefined
    }
  }