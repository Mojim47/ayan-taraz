interface Window {
    console: Console;
    localStorage: Storage;
    location: Location;
  }
  
  interface Console {
    log(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
  }