// Core
import chalk from 'chalk';

// Types
import * as types from './types';

export const catchErrors = ({ error, showFullError }: types.CatchErrorsTypes) => {
    const headerError = 'burst-generate-files ↓';

    if (Array.isArray(error)) {
        console.error(chalk.red(`Errors ${headerError}`));
        for (let i = 0; i < error.length; i++) {
            if (showFullError) {
                console.error(error[ i ]);
            } else {
                console.error(error[ i ].message);
            }
        }

        return;
    }
    if (error) {
        console.error(chalk.red(`Error ${headerError}`));

        if (showFullError) {
            console.error(error);
        } else {
            console.error(error.message);
        }
    }
};
