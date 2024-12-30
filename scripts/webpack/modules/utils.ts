// Core
import { Configuration, DefinePlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import NodeExternals from 'webpack-node-externals';
import dotenv from 'dotenv';

export const connectBuildProgressIndicator = (): Configuration => ({
    plugins: [new WebpackBar({ basic: true })],
});

export const defineEnvVariables = (): Configuration => {
    const envFileFinder = (path: string): string => {
        return JSON.stringify(dotenv.config({ path }).parsed) ?? envFileFinder('.env.example');
    };

    const environmentHandler = () => {
        switch (process?.env?.NODE_ENV) {
            case 'development':
                return envFileFinder('.env.development');
            case 'production':
                return envFileFinder('.env.production');
            default:
                return envFileFinder('.env.example');
        }
    };

    return {
        plugins: [
            new DefinePlugin({
                'process.env': environmentHandler(),
            }),
        ],
    };
};

export const nodeExternals = (): Configuration => ({
    externalsPresets: { node: true },
    externals: [NodeExternals()],
});
