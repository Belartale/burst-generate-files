// Core
import merge from 'webpack-merge';

// Constants
import { SOURCE_DIRECTORY, BUILD_DIRECTORY } from '../constants';

// Modules
import * as modules from '../modules';

export const getCommonConfig = () => {
    return merge(
        {
            mode: 'production',
            devtool: false,
            entry: [SOURCE_DIRECTORY],
            output: {
                filename: 'index.js',
                path: BUILD_DIRECTORY,
                library: 'burstGenerateFiles',
            },
            resolve: {
                extensions: ['.ts', '.js'],
            },
        },
        modules.cleanDirectories(),
        modules.nodeExternals(),
        modules.loadTypeScript(),
        modules.defineEnvVariables(),
        modules.connectBuildProgressIndicator(),
        modules.optimizeBuild(),
    );
};
