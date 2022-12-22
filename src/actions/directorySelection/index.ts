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

export const directorySelection = ({ template, PROJECT_ROOT, selectedNames }: DirectorySelection) => {
    console.log('directorySelection_______________________________________');

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
                        console.log(`result >>> ${ result }`);
                        if (result === '../') {
                            const valuesCurrentDirectorySplitted = values.currentDirectory.split('\\');


                            return valuesCurrentDirectorySplitted.slice(0, valuesCurrentDirectorySplitted.length - 1).join('\\');
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
                return askPrompt(values.currentDirectory);
            }


            return outputPathReplacedWordCase;
        };


        if (typeof template.outputPath === 'string') {
            askPrompt(replaceWordCase({
                string:            template.outputPath,
                stringsForReplace: selectedNames,
            })).then((resultPromise) => {
                template.outputPath = resultPromise;
            });
        } else if (Array.isArray(template.outputPath)) {
            template.outputPath = template.outputPath.map((outputPath) => { // todo test if outputPath is ARRAY !!!!!!!!
                let result = { value: outputPath };
                askPrompt(replaceWordCase({
                    string:            outputPath,
                    stringsForReplace: selectedNames,
                })).then((resultPromise) => {
                    result.value = resultPromise;
                });

                return result.value;
            });
        }
    }
};
