// Core
import path from 'path';
import fs from 'fs';
import enquirer from 'enquirer';

import { replaceWordCase } from '../../utils';

// Types
import * as typesCommon from '../../types';
import * as typesActions from '../types';

type DirectorySelection = {
    template: typesCommon.SettingCLIGenTemplate,
    PROJECT_ROOT: string
    selectedNames: typesActions.GetSelectedName | typesActions.GetSelectedName[]
}

const getDirectories = ({ source }: {source: string}) => {
    return [
        '../', './',
        ...fs.readdirSync(source, { withFileTypes: true })
            .filter((dir) => dir.isDirectory())
            .map((dir) => '/' + dir.name),
    ];
};

export const directorySelection = async ({
    template,
    PROJECT_ROOT,
    selectedNames,
}: DirectorySelection) => {
    if (typeof template.directorySelection === 'boolean' && template.directorySelection) {
        const askPrompt = async (outputPathReplacedWordCase: string): Promise<string> => {
            const values = {
                isPrompt:         true,
                currentDirectory: path.resolve(PROJECT_ROOT, outputPathReplacedWordCase),
            };

            const gotValue: { directorySelection: string } = await enquirer.prompt(
                {
                    type:    'select',
                    name:    'directorySelection',
                    message: `Choose a directory!\nCurrent directory: ${values.currentDirectory}`,
                    choices: getDirectories({ source: values.currentDirectory }),
                    result:  (result) => {
                        if (result === '../') {
                            const valuesCurrentDirectorySplitted = values.currentDirectory.split('\\');


                            const newPath = valuesCurrentDirectorySplitted.slice(0, valuesCurrentDirectorySplitted.length - 1).join('\\');

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

            values.currentDirectory = gotValue.directorySelection;

            if (values.isPrompt) {
                const result = await askPrompt(values.currentDirectory);

                return result;
            }


            return outputPathReplacedWordCase;
        };


        // if (typeof template.outputPath === 'string') {
        //     askPrompt(replaceWordCase({
        //         string:            template.outputPath,
        //         stringsForReplace: selectedNames,
        //     })).then((resultPromise) => {
        //         template.outputPath = resultPromise;
        //     });
        // } else if (Array.isArray(template.outputPath)) {
        //     template.outputPath = template.outputPath.map((outputPath) => { // todo test if outputPath is ARRAY !!!!!!!!
        //         let result = { value: outputPath };
        //         askPrompt(replaceWordCase({
        //             string:            outputPath,
        //             stringsForReplace: selectedNames,
        //         })).then((resultPromise) => {
        //             result.value = resultPromise;
        //         });

        //         return result.value;
        //     });
        // }


        if (typeof template.outputPath === 'string') {
            await askPrompt(replaceWordCase({
                string:            template.outputPath,
                stringsForReplace: selectedNames,
            })).then((resultPromise) => {
                template.outputPath = resultPromise;
            });
        } else if (Array.isArray(template.outputPath)) { // [ 'outputPath1', 'outputPath2' ]
            // template.outputPath.map(async (outputPath) => { // todo test if outputPath is ARRAY !!!!!!!!
            //     let result = { value: outputPath };
            //     await askPrompt(replaceWordCase({ // питає у користувача в терміналі
            //         string:            outputPath,
            //         stringsForReplace: selectedNames,
            //     })).then((resultPromise) => {
            //         result.value = resultPromise;
            //     });

            //     return result.value;
            // });

            let resultPromises: any = { value: []};

            for await (const iteratorOutputPath of template.outputPath) {
                iteratorOutputPath;

                await askPrompt(replaceWordCase({ // питає у користувача в терміналі
                    string:            iteratorOutputPath,
                    stringsForReplace: selectedNames,
                })).then((resultPromise) => {
                    resultPromises.value = [ ...resultPromises.value, resultPromise ];
                });
            }
            template.outputPath = resultPromises;

            return;
        }
    }

    return template.outputPath;
};
