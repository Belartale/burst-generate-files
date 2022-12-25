// Core
import Enquirer from 'enquirer';
import path from 'path';
import fs from 'fs';

// Types
import * as types from './types';

const getDirectories = ({ source }: types.GetDirectories) => {
    return [
        '../', './',
        ...fs.readdirSync(source, { withFileTypes: true })
            .filter((dir) => dir.isDirectory())
            .map((dir) => '/' + dir.name),
    ];
};

const getChangedPath = ({ result, values }: types.GetChangedPath): string => {
    const action = ({ result, values, symbol }: types.Action): string => {
        if (result === '../') {
            const valuesCurrentDirectorySplitted = values.currentDirectory.split(symbol);

            return [ ...valuesCurrentDirectorySplitted, '..' ].join(symbol);
        }

        if (result === './') {
            values.isPrompt = false;

            return values.currentDirectory;
        }

        return `${values.currentDirectory}${symbol}${result.slice(1, result.length)}`;
    };

    if (values.currentDirectory.includes('/')) {
        return action({ result, values, symbol: '/' });
    }

    if (values.currentDirectory.includes('\\')) {
        return action({ result, values, symbol: '\\' });
    }

    return result;
};

export const askDirectory = async ({
    outputPathReplacedWordCase,
    PROJECT_ROOT,
}: types.AskDirectory): Promise<string> => {
    const values: types.Values = {
        isPrompt:         true,
        currentDirectory: path.resolve(PROJECT_ROOT, outputPathReplacedWordCase),
    };

    do {
        const gotValue: { selectDirectory: string } = await Enquirer.prompt(
            {
                type:    'select',
                name:    'selectDirectory',
                message: `Choose a directory!\nCurrent directory: ${values.currentDirectory}`,
                choices: getDirectories({ source: values.currentDirectory }),
                result:  (result) => {
                    return path.resolve(getChangedPath({ result, values }));
                },
            },
        );

        values.currentDirectory = gotValue.selectDirectory;
    } while (values.isPrompt);

    return values.currentDirectory;
};
