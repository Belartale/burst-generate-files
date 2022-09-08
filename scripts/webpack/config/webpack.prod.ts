// Core
import merge from 'webpack-merge';

// Configurations
import { getCommonConfig } from './webpack.common';

// Modules
import * as modules from '../modules';

export const getProdConfig = () => {
    return merge(
        modules.cleanDirectories(),
        getCommonConfig(),
        {
            // target:  'web',
            mode:    'production',
            devtool: false,
            output:  {
                library: 'burstGenerateFiles',
            },
        },
        modules.connectBuildProgressIndicator(),
        modules.optimizeBuild(),
    );
};
