// Core
import Enquirer from 'enquirer';
import { resolve } from 'path';

// Constants
import {
    slash,
    controllersDirectories,
    partOfMessageForCreatingCLI,
} from './constants';

// Functions
import { getDirectories } from './getDirectories';

// Types
import * as types from './types';

const getChangedPath = ({ result, values }: types.GetChangedPath): string => {
    if (result === controllersDirectories[ 0 ]) {
        const valuesCurrentDirectorySplitted = values.currentDirectory.split(slash);

        if (values.currentDirectory.includes(partOfMessageForCreatingCLI)) {
            return resolve([ ...values.currentDirectory.replace(partOfMessageForCreatingCLI, '').split(slash), '..' ].join(slash));
        }

        return resolve([ ...valuesCurrentDirectorySplitted, '..' ].join(slash));
    }

    if (result === controllersDirectories[ 1 ]) {
        values.isPrompt = false;

        if (values.currentDirectory.includes(partOfMessageForCreatingCLI)) {
            return resolve(values.currentDirectory.replace(partOfMessageForCreatingCLI, ''));
        }

        return resolve(values.currentDirectory);
    }

    if (result.includes(partOfMessageForCreatingCLI)) {
        return resolve(`${values.currentDirectory}${slash}${result.slice(1, result.length).replace(partOfMessageForCreatingCLI, '')}`) + partOfMessageForCreatingCLI;
    }

    return resolve(`${values.currentDirectory}${slash}${result.slice(1, result.length)}`);
};

export const askDirectory = async ({
    outputPath,
    selectedNames,
}: types.AskDirectory): Promise<string> => {
    const values: types.Values = {
        isPrompt:         true,
        currentDirectory: outputPath,
    };

    do {
        const gotValue: { selectDirectory: string } = await Enquirer.prompt(
            {
                type:    'select',
                name:    'selectDirectory',
                message: `Choose a directory!\n    Current directory: ${values.currentDirectory.replace(partOfMessageForCreatingCLI, '')}`,
                choices: getDirectories({
                    currentDirectory:   values.currentDirectory,
                    outputAbsolutePath: outputPath,
                    selectedNames,
                }),
                result: (result) => {
                    return getChangedPath({ result, values });
                },
            },
        );

        values.currentDirectory = gotValue.selectDirectory;
    } while (values.isPrompt);

    return values.currentDirectory;
};
