// Core
import chalk from 'chalk';

export const catchErrors = (error: any) => {
    const headerError = 'burst-generate-files ↓';

    if (Array.isArray(error)) {
        console.error(chalk.red('Errors' + headerError));
        for (let i = 0; i < error.length; i++) {
            console.error(error[ i ].message); // todo ? error.message ?
        }

        return;
    }
    if (error) {
        console.error(chalk.red('Error' + headerError));
        console.error(error.message); // todo ? error.message ?
    }
};
