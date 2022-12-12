// Core
import path from 'path';
import fs from 'fs';
import { Transform } from 'stream';

// Constants
import { nameFolderForMarkers } from '../../constants';

// Utils
import { replaceWordCase } from '../replaceWordCase';

// Types
import * as types from './types';

export const createFiles = (
    { pathToTemplate, outputPath, selectedNames }: types.CreateFiles,
) => {
    const copyDir = (copyDirSrc: string, copyDirDest: string | string[], copyDirCallback: Function) => {
        const copy = (copySrc: string, copyDest: string) => {
            fs.readdir(copySrc, (error, list) => {
                if (error) {
                    copyDirCallback(error);

                    return;
                }
                list.forEach((item) => {
                    const ss = path.resolve(copySrc, item);
                    fs.stat(ss, (error, stat) => {
                        if (error) {
                            copyDirCallback(error);
                        } else {
                            const curSrc = path.resolve(copySrc, item);
                            const curDest = replaceWordCase({
                                string:            path.resolve(copyDest, item),
                                stringsForReplace: selectedNames,
                            });

                            if (stat.isFile()) {
                                fs.createReadStream(curSrc).pipe(new Transform({
                                    transform(chunk, encoding, callback) {
                                        this.push(replaceWordCase({
                                            string:            chunk.toString(),
                                            stringsForReplace: selectedNames,
                                        }));
                                        callback();
                                    },
                                }))
                                    .pipe(fs.createWriteStream(curDest));
                            } else if (stat.isDirectory() && path.basename(curSrc) !== nameFolderForMarkers) {
                                fs.mkdirSync(curDest, { recursive: true });
                                copy(curSrc, curDest);
                            }
                        }
                    });
                });
            });
        };


        if (Array.isArray(copyDirDest)) {
            copyDirDest.map((string) => replaceWordCase({
                string,
                stringsForReplace: selectedNames,
            })).forEach((dest) => {
                fs.access(dest, (error) => {
                    if (error) {
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    copy(copyDirSrc, dest);
                });
            });
        }
        if (typeof copyDirDest === 'string') {
            const rightDest = replaceWordCase({
                string:            copyDirDest,
                stringsForReplace: selectedNames,
            });
            fs.access(rightDest, (error) => {
                if (error) {
                    fs.mkdirSync(rightDest, { recursive: true });
                }
                copy(copyDirSrc, rightDest);
            });
        }
    };


    if (Array.isArray(pathToTemplate)) {
        pathToTemplate.forEach((path) => {
            copyDir(path, outputPath, (error: any) => {
                throw error;
            });
        });

        return;
    }

    copyDir(pathToTemplate, outputPath, (error: any) => {
        throw error;
    });
};
