// Core
import chalk from 'chalk';

// Utils
import { replaceWordCase } from '../../utils';

// Functions
import { askDirectory } from './askDirectory';

// Types
import * as types from './types';

export const selectDirectory = async ({
    template,
    PROJECT_ROOT,
    selectedNames,
}: types.SelectDirectory) => {
    if (typeof template.selectDirectory === 'boolean' && template.selectDirectory) {
        if (typeof template.outputPath === 'string') {
            await askDirectory({
                outputPathReplacedWordCase: replaceWordCase({
                    string:            template.outputPath,
                    stringsForReplace: selectedNames,
                }),
                PROJECT_ROOT,
            }).then((resultPromise) => {
                template.outputPath = resultPromise;
            });
        } else if (Array.isArray(template.outputPath)) {
            let result: any = { value: []};

            for await (const iteratorOutputPath of template.outputPath) {
                await askDirectory({
                    outputPathReplacedWordCase: replaceWordCase({
                        string:            iteratorOutputPath,
                        stringsForReplace: selectedNames,
                    }),
                    PROJECT_ROOT,
                }).then((resultPromise) => {
                    result.value = [ ...result.value, resultPromise ];
                });
            }
            template.outputPath = result.value;
        }

        const log = (text: string) => {
            console.log(`    ${text}`);
        };

        console.log(chalk.yellow('You changed outputPath:'));
        if (typeof template.outputPath === 'string') {
            log(template.outputPath);
        }
        if (Array.isArray(template.outputPath)) {
            template.outputPath.forEach((outputPath) => {
                log(outputPath);
            });
        }
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
    }
};
