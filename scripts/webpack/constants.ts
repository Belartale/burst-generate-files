// Core
import { path as PROJECT_ROOT } from 'app-root-path';
import { resolve } from 'path';

// Paths
export { PROJECT_ROOT };
export const SOURCE_DIRECTORY = resolve(PROJECT_ROOT, './src');
export const BUILD_DIRECTORY = resolve(PROJECT_ROOT, './build');
export const nodeModulePath = (nodeModuleName: string) => resolve(PROJECT_ROOT, `./node_modules/${nodeModuleName}`);

// App
export const APP_NAME = process.env.APP_NAME || 'burst-generate-files';

// Modes
export enum MODE {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}
