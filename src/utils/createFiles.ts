// Core
import path from 'path';
import fs from 'fs';
import { Transform } from 'stream';

// Constants
import { folderNameForMarkers } from '../constants';

// Utils
import { replaceWordCase } from './replaceWordCase';

// Types
import * as types from '../types';

export const createFiles = (
    { fromFolderPath, toPath, selectedNames }: types.CreateFiles,
) => {
    const copyDir = (src: string, dest: string, callback: Function) => {
        const copy = (copySrc: string, copyDest: string) => {
            fs.readdir(copySrc, (error, list) => {
                if (error) {
                    callback(error);

                    return;
                }
                list.forEach((item) => {
                    const ss = path.resolve(copySrc, item);
                    fs.stat(ss, (error, stat) => {
                        if (error) {
                            callback(error);
                        } else {
                            const curSrc = path.resolve(copySrc, item);
                            const curDest = path.resolve(copyDest, item);

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

                                fs.access(dest, (error) => {
                                    if (error) {
                                        throw error;
                                    }
                                    fs.rename(
                                        curDest,
                                        replaceWordCase(
                                            {
                                                string:            curDest,
                                                stringsForReplace: selectedNames,
                                            },
                                        ),
                                        (error) => {
                                            if (error) {
                                                throw error;
                                            }
                                        },
                                    );
                                });
                            } else if (stat.isDirectory() && path.basename(curSrc) !== folderNameForMarkers) {
                                fs.mkdirSync(curDest, { recursive: true });
                                copy(curSrc, curDest);
                            }
                        }
                    });
                });
            });
        };

        fs.access(dest, (error) => {
            if (error) {
                fs.mkdirSync(dest, { recursive: true });
            }
            copy(src, dest);
        });
    };


    copyDir(fromFolderPath, toPath, (error: any) => {
        throw error;
    });
};
