// Core
import chalk from 'chalk';

// Constants
import { CUSTOM_ERROR } from '../../constants';

// Types
import * as types from './types';

export const catchErrors = ({ error, showFullError }: types.CatchErrorsTypes) => {
    const headerError = '\nErrors burst-generate-files:';

    if (Array.isArray(error)) {
        console.error(chalk.red(headerError));
        for (let i = 0; i < error.length; i++) {
            if (!showFullError && error[ i ].name === CUSTOM_ERROR) {
                console.error(``);
                console.error(error[ i ].message);
            } else {
                console.error(``);
                console.error(error[ i ]);
            }
        }

        return;
    }
    if (error) {
        console.error(chalk.red(headerError));

        if (!showFullError && error.name === CUSTOM_ERROR) {
            console.error(``);
            console.error(error.message);
        } else {
            console.error(``);
            console.error(error);
        }
    }
};
