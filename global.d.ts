// global.d.ts
export {};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }

  // allow using grecaptcha directly in client code
  const grecaptcha: Window['grecaptcha'];
}
