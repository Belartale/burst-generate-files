// Core
import { Configuration } from 'webpack';
import NodeExternals from 'webpack-node-externals';

export const nodeExternals = (): Configuration => ({
    externalsPresets: { node: true },
    externals:        [ NodeExternals() ],
});

