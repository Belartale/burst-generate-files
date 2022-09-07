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
            entry:  [ SOURCE_DIRECTORY ],
            output: {
                filename: 'index.js',
                path:     BUILD_DIRECTORY,
            },
            resolve: {
                extensions: [ '.ts', '.js' ],
                fallback:   {
                    // path: require.resolve('path-browserify'),
                },
                // fallback:   {
                //     path:     require.resolve('path-browserify'),
                //     stream:   require.resolve('stream-browserify'),
                //     assert:   false,
                //     buffer:   require.resolve('buffer'),
                //     fs:       false,
                //     readline: false,
                // },

            },
        },
        // modules.nodePolyfillPlugin(),
        modules.loadTypeScript(),
        modules.defineEnvVariables(),
    );
};
