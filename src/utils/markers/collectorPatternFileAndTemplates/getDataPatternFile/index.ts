// Core
import fs from 'fs';
import { resolve, basename, extname } from 'path';

// Constants
import { folderNameForMarkers } from '../../../../constants';

// Types
import * as types from '../../types';

export const getDataPatternFile = (
    { tabs, pathToTemplate, optionsMarker, PROJECT_ROOT }: types.GetDataIfIsFileOrReturnArgument,
) => {
    let readPatternFileData: any = [];
    const pathsToPattern: any = [];

    const lookForPatternFile = ({ path, tabs, pattern }: types.ReadPatternFile) => {
        const list = fs.readdirSync(resolve(PROJECT_ROOT, path));

        list.forEach((item) => {
            const src = resolve(path, item);

            const statsObj = fs.statSync(resolve(PROJECT_ROOT, src));

            if (statsObj.isFile()) {
                if (basename(src, extname(src)) === pattern) {
                    pathsToPattern.push(src);
                }
            }

            if (statsObj.isDirectory()) {
                lookForPatternFile({ path: src, tabs, pattern });
            }
        });

        if (pathsToPattern.length > 1) {
            throw new Error(`You have same files: ${JSON.stringify(pathsToPattern)} !`);
        }

        if (fs.existsSync(resolve(PROJECT_ROOT, pathsToPattern[ 0 ]))) {
            return fs.readFileSync(resolve(PROJECT_ROOT, pathsToPattern[ 0 ]), { encoding: 'utf-8' }).split(/\r?\n/)
                .map((line) => tabs + line);
        }

        return false;
    };


    if (typeof pathToTemplate === 'string' && typeof optionsMarker.pattern === 'string' && fs.existsSync(resolve(pathsToPattern[ 0 ], pathToTemplate, folderNameForMarkers))) {
        const srcFolderNameForMarkers = resolve(pathToTemplate, folderNameForMarkers);

        const data = lookForPatternFile(
            { path: srcFolderNameForMarkers, tabs, pattern: optionsMarker.pattern },
        );

        if (data) {
            readPatternFileData.push(...data);
        }
    }

    if (Array.isArray(pathToTemplate)) {
        pathToTemplate.forEach((string) => {
            if (fs.existsSync(resolve(pathsToPattern[ 0 ], string, folderNameForMarkers))) {
                const result = lookForPatternFile(
                    { path: resolve(string, folderNameForMarkers), tabs, pattern: optionsMarker.pattern },
                );
                if (result) {
                    readPatternFileData.push(...result);
                }
            }
        });
    }

    if (readPatternFileData[ 0 ]) {
        return tabs + readPatternFileData.join('\n').trim();
    }

    return false;
};
