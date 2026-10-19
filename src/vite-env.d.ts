/// <reference types="vite/client" />
declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const Content: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
  export default Content;
}
