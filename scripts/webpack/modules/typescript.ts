// Core
import { Configuration } from 'webpack';

export const loadTypeScript = (): Configuration => ({
    module: {
        rules: [
            {
                test:    /\.ts(x?)$/,
                include: /src/,
                exclude: /node_modules/,
                use:     {
                    loader: 'ts-loader',
                },
            },
        ],
    },
});

