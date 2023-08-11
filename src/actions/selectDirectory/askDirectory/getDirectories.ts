// Core
import fs from 'fs';
import { resolve } from 'path';

// Constants
import {
    slash,
    controllersDirectories,
} from './constants';

// Utils
import { removeDuplicateArray, replaceWordCase } from '../../../utils';

// Types
import * as types from './types';

export const getDirectories = ({
    currentDirectory,
    outputAbsolutePath,
    selectedNames,
}: types.GetDirectories) => {
    const splittedOutputAbsolutePath = outputAbsolutePath.split(slash);
    const lsatFolderOutputPath = splittedOutputAbsolutePath.at(-1) as string;

    const splittedCurrentDirectory = currentDirectory.split('\\');
    const lastFolderCurrentDirectory = splittedCurrentDirectory.at(-1);

    const numberCurrentFolderOfOutputAbsolutePath
                    = splittedOutputAbsolutePath.indexOf(lastFolderCurrentDirectory as string);

    const nextFolder = numberCurrentFolderOfOutputAbsolutePath >= 0
        ? splittedOutputAbsolutePath[ numberCurrentFolderOfOutputAbsolutePath + 1 ] : null;

    const getFolders = (directory: string) => fs.readdirSync(
        replaceWordCase({
            string:            directory,
            stringsForReplace: selectedNames,
        }),
        { withFileTypes: true },
    )
        .filter((dir) => dir.isDirectory())
        .map((dir) => '/' + dir.name);

    const isExistsDirectory = (directory: string) => fs.existsSync(replaceWordCase({
        string:            directory,
        stringsForReplace: selectedNames,
    }));

    if (selectedNames.some((selectedName) => outputAbsolutePath.includes(selectedName.replaceVar))) {
        if (currentDirectory !== outputAbsolutePath) {
            if (isExistsDirectory(currentDirectory)) {
                if (nextFolder && outputAbsolutePath.includes(resolve(currentDirectory, nextFolder))) {
                    return removeDuplicateArray<string>([
                        ...controllersDirectories,
                        `/${nextFolder}`,
                        ...getFolders(currentDirectory),
                    ]);
                }

                return [
                    ...controllersDirectories,
                    ...getFolders(currentDirectory),
                ];
            }

            if (!isExistsDirectory(currentDirectory)) {
                if (nextFolder) {
                    return [
                        ...controllersDirectories,
                        `/${nextFolder}`,
                    ];
                }

                return [ ...controllersDirectories ];
            }
        }
        if (currentDirectory === outputAbsolutePath) {
            if (isExistsDirectory(currentDirectory)) {
                return [
                    ...controllersDirectories,
                    ...getFolders(currentDirectory),
                ];
            }
            if (!isExistsDirectory(currentDirectory)) {
                return [ ...controllersDirectories ];
            }
        }

        return [
            ...controllersDirectories,
            ...getFolders(currentDirectory),
        ];
    }

    return [
        ...controllersDirectories,
        ...getFolders(currentDirectory),
    ];
};
