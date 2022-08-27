// Core
import { path as PROJECT_ROOT } from 'app-root-path';
import { resolve } from 'path';

// Network
export const HOST = 'localhost';
export const PORT = 3333;

// Paths
export { PROJECT_ROOT };
export const SOURCE_DIRECTORY = resolve(PROJECT_ROOT, './src');
export const BUILD_DIRECTORY = resolve(PROJECT_ROOT, './dist');
export const STATIC_DIRECTORY = resolve(PROJECT_ROOT, './static');
export const nodeModulePath = (nodeModuleName: string) => resolve(PROJECT_ROOT, `./node_modules/${nodeModuleName}`);

// App
export const APP_NAME = process.env.APP_NAME || 'mScript';
