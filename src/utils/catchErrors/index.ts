// Core
import chalk from 'chalk';

export const catchErrors = (error: any) => {
    if (Array.isArray(error)) {
        for (let i = 0; i < error.length; i++) {
            console.error(chalk.red('Error burst-generate-files ↓'));
            console.error(error[ i ].message); // todo ? error.message ?
        }

        return;
    }
    if (error) {
        console.error(chalk.red('Error burst-generate-files ↓'));
        console.error(error.message); // todo ? error.message ?
    }
};
