// Core
import path from 'path';
import fs from 'fs';

// Constants
import { nameFolderForMarkers } from '../../constants';

// Utils
import { replaceWordCase } from '../../utils';

// Types
import * as types from './types';

export const createFiles = ({ pathToTemplate, outputPath, selectedNames }: types.CreateFiles): void => {
    const copyDir = (copyDirSrc: string, copyDirDest: string | string[]) => {
        const copy = (copySrc: string, copyDest: string) => {
            const list = fs.readdirSync(copySrc);

            list.forEach((item) => {
                const ss = path.resolve(copySrc, item);
                const stat = fs.statSync(ss);

                const curSrc = path.resolve(copySrc, item);
                const curDest = replaceWordCase({
                    string: path.resolve(copyDest, item),
                    stringsForReplace: selectedNames,
                });

                if (stat.isFile()) {
                    const content = fs.readFileSync(curSrc, 'utf-8');

                    const modifiedContent = replaceWordCase({
                        string: content,
                        stringsForReplace: selectedNames,
                    });

                    fs.writeFileSync(curDest, modifiedContent);
                } else if (stat.isDirectory() && path.basename(curSrc) !== nameFolderForMarkers) {
                    fs.mkdirSync(curDest, { recursive: true });
                    copy(curSrc, curDest);
                }
            });
        };

        if (Array.isArray(copyDirDest)) {
            copyDirDest
                .map((string) =>
                    replaceWordCase({
                        string,
                        stringsForReplace: selectedNames,
                    }),
                )
                .forEach((dest) => {
                    try {
                        fs.accessSync(dest);
                    } catch {
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    copy(copyDirSrc, dest);
                });
        }

        if (typeof copyDirDest === 'string') {
            const rightDest = replaceWordCase({
                string: copyDirDest,
                stringsForReplace: selectedNames,
            });

            try {
                fs.accessSync(rightDest);
            } catch {
                fs.mkdirSync(rightDest, { recursive: true });
            }
            copy(copyDirSrc, rightDest);
        }
    };

    if (Array.isArray(pathToTemplate)) {
        pathToTemplate.forEach((templatePath) => {
            copyDir(templatePath, outputPath);
        });

        return;
    }

    copyDir(pathToTemplate, outputPath);
};
