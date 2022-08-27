// Core
import merge from 'webpack-merge';

// Constants
import { SOURCE_DIRECTORY, BUILD_DIRECTORY } from '../constants';

// Modules
import * as modules from '../modules';

export const getCommonConfig = () => {
    return merge(
        {
            target: 'node',
        },
        // {
        //     resolve: {
        //         alias: {
        //             fs: require.resolve('fs'),
        //         },
        //     },
        // },
        // {
        //     resolve: {
        //         fallback: {
        //             os:     require.resolve('os-browserify/browser'),
        //             path:   require.resolve('path-browserify'),
        //             fs:     require.resolve('fs'),
        //             stream: require.resolve('stream-browserify'),
        //         },
        //     },
        // },
        {
            entry:  [ SOURCE_DIRECTORY ],
            output: {
                filename: 'index.js',
                path:     BUILD_DIRECTORY,
            },
            resolve: {
                extensions: [ '.ts', '.js' ],
            },
        },
        // modules.nodePolyfillPlugin(),
        modules.loadTypeScript(),
        modules.defineEnvVariables(),
    );
};
