// clsx.d.ts - Minimal type declaration for clsx
// This allows TypeScript to recognize the 'clsx' import if the package is not yet installed.
declare module 'clsx' {
  export default function clsx(...args: any[]): string;
}
