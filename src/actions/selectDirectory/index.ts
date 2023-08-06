// Core
import chalk from 'chalk';

// Constants
import { spaces } from '../../constants';

// Functions
import { askDirectory } from './askDirectory';

// Types
import * as types from './types';

const showWarningsAboutCheckMarkers = ({
    template,
    newOutputPath,
}: types.ShowWarningsAboutCheckMarkers) => {
    const messageForChanging = '\nYou changed outputPath:';

    const log = (text: string) => {
        console.log(spaces + text);
    };

    const lastPartOfMessage = () => {
        console.log(chalk.yellow('You have to check your markers !!!\nYour markers:'));
        template.markers?.forEach((marker) => {
            if (typeof marker.pathToMarker === 'string') {
                log(marker.pathToMarker);
            }
            if (Array.isArray(marker.pathToMarker)) {
                marker.pathToMarker.forEach((pathToMarker) => {
                    log(pathToMarker);
                });
            }
        });
    };

    if (typeof newOutputPath === 'string' && template.outputPath !== newOutputPath) {
        console.log(chalk.yellow(messageForChanging));
        log(newOutputPath);
        lastPartOfMessage();
    }
    if (Array.isArray(newOutputPath) && newOutputPath.some((newPath) => !template.outputPath.includes(newPath))) {
        console.log(chalk.yellow(messageForChanging));
        newOutputPath.forEach((newPath) => {
            if (!template.outputPath.includes(newPath)) {
                log(newPath);
            }
        });
        lastPartOfMessage();
    }
};

export const selectDirectory = async ({
    template,
    selectedNames,
}: types.SelectDirectory) => {
    if (typeof template.selectDirectory === 'boolean' && template.selectDirectory) {
        if (typeof template.outputPath === 'string') {
            await askDirectory({
                outputPath: template.outputPath,
                selectedNames,
            }).then((resultPromise) => {
                showWarningsAboutCheckMarkers({
                    template,
                    newOutputPath: resultPromise,
                });
                template.outputPath = resultPromise;
            });
        }
        if (Array.isArray(template.outputPath)) {
            let result: {value: [] | string[]} = { value: []};

            for await (const iteratorOutputPath of template.outputPath) {
                await askDirectory({
                    outputPath: iteratorOutputPath,
                    selectedNames,
                }).then((resultPromise) => {
                    result.value = [ ...result.value, resultPromise ];
                });
            }
            showWarningsAboutCheckMarkers({
                template,
                newOutputPath: result.value,
            });
            template.outputPath = result.value;
        }
    }
};
