declare global {
  interface Window {
    ym?: (id: number, event: string, options?: Record<string, any>) => void;
  }
}
export {};