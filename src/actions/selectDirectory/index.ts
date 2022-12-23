// Core
import path from 'path';
import fs from 'fs';
import enquirer from 'enquirer';

import { replaceWordCase } from '../../utils';

// Types
import * as types from './types';

const getDirectories = ({ source }: {source: string}) => {
    return [
        '../', './',
        ...fs.readdirSync(source, { withFileTypes: true })
            .filter((dir) => dir.isDirectory())
            .map((dir) => '/' + dir.name),
    ];
};

export const selectDirectory = async ({
    template,
    PROJECT_ROOT,
    selectedNames,
}: types.DirectorySelection) => {
    if (typeof template.selectDirectory === 'boolean' && template.selectDirectory) {
        const askPrompt = async (outputPathReplacedWordCase: string): Promise<string> => {
            const values = {
                isPrompt:         true,
                currentDirectory: path.resolve(PROJECT_ROOT, outputPathReplacedWordCase),
            };

            const gotValue: { selectDirectory: string } = await enquirer.prompt(
                {
                    type:    'select',
                    name:    'selectDirectory',
                    message: `Choose a directory!\nCurrent directory: ${values.currentDirectory}`,
                    choices: getDirectories({ source: values.currentDirectory }),
                    result:  (result) => {
                        if (result === '../') {
                            const valuesCurrentDirectorySplitted = values.currentDirectory.split('\\');


                            const newPath = valuesCurrentDirectorySplitted.slice(0, valuesCurrentDirectorySplitted.length - 1).join('\\'); // todo replace remove last path to "../"

                            return newPath;
                        }

                        if (result === './') {
                            values.isPrompt = false;

                            return values.currentDirectory;
                        }

                        return `${values.currentDirectory}\\${result}`;
                    },
                },
            );

            values.currentDirectory = gotValue.selectDirectory;

            if (values.isPrompt) {
                const result = await askPrompt(values.currentDirectory);

                return result;
            }


            return outputPathReplacedWordCase;
        };

        // outputPath
        if (typeof template.outputPath === 'string') {
            await askPrompt(replaceWordCase({
                string:            template.outputPath,
                stringsForReplace: selectedNames,
            })).then((resultPromise) => {
                template.outputPath = resultPromise;
            });
        } else if (Array.isArray(template.outputPath)) {
            let resultPromises: any = { value: []};

            for await (const iteratorOutputPath of template.outputPath) {
                iteratorOutputPath;

                await askPrompt(replaceWordCase({
                    string:            iteratorOutputPath,
                    stringsForReplace: selectedNames,
                })).then((resultPromise) => {
                    resultPromises.value = [ ...resultPromises.value, resultPromise ];
                });
            }
            template.outputPath = resultPromises.value;
        }

        // markers
        // if (template.markers) {
        //     template.markers = template.markers.map((objectMarker) => {
        //         return objectMarker;
        //     });
        // }
    }
};
