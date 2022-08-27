// Core
import colors from 'colors';
import path from 'path';
import fs from 'fs';
import { Transform } from 'stream';

// Types
import { CreateFiles } from '../types';

// Utils
import { replaceWordCase } from './replaceWordCase';

export const createFiles = (
    { fromFolderPath, toPath, selectedConfigItem, selectedName }: CreateFiles,
) => {
    try {
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
                                                string:          chunk.toString(),
                                                stringReplacers: selectedConfigItem.stringReplacers,
                                                selectedName,
                                            }));
                                            callback();
                                        },
                                    }))
                                        .pipe(fs.createWriteStream(curDest));

                                    fs.access(dest, (error) => {
                                        if (error) {
                                            console.log(colors.red('error access copy file'));
                                            console.log(error);
                                            throw error;
                                        }
                                        fs.rename(
                                            curDest,
                                            replaceWordCase(
                                                {
                                                    string:          curDest,
                                                    stringReplacers: selectedConfigItem.stringReplacers,
                                                    selectedName,
                                                },
                                            ),
                                            (error) => {
                                                if (error) {
                                                    console.log(colors.red('error rename file'));
                                                    console.log(error);
                                                    throw error;
                                                }
                                            },
                                        );
                                    });
                                } else if (stat.isDirectory()) {
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
            console.log(colors.red(error));
            throw error;
        });
    } catch (error) {
        // return [ `Copy failed: ${error}` ];\
        console.log(colors.red(`${error}`));
    }
};
