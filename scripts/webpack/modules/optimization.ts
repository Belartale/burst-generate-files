// Core
import { ContextReplacementPlugin, Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const optimizeBuild = (): Configuration => ({
    optimization: {
        nodeEnv:      'production',
        minimize:     false,
        minimizer:    [ new TerserPlugin() ],
        splitChunks:  false,
        runtimeChunk: false,
    },
});

export const cleanDirectories = (): Configuration => ({
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
        }),
    ],
});
