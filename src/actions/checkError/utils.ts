// Core
import fs from 'fs';
import { resolve } from 'path';
import { z as zod } from 'zod';

// Types
import { SettingsMarker } from '../types';
import { CheckError, GetRefineParams } from './types';

export const checkRefineCallback =
    (rootPath: CheckError['rootPath']) =>
    (path: string | string[]): path is string | string[] => {
        if (Array.isArray(path)) {
            return path.every((p) => fs.existsSync(resolve(rootPath, p)));
        }

        return fs.existsSync(resolve(rootPath, path));
    };

export const getRefineParams: GetRefineParams =
    (rootPath: CheckError['rootPath'], params?: zod.CustomErrorParams) => (path: string | string[]) => {
        const arrayPathToTemplate = [path].flat(Infinity);
        const result = arrayPathToTemplate.flat(Infinity).filter((p) => typeof p === 'string' && !fs.existsSync(resolve(rootPath, p)));

        return {
            message: `${result.join(', ')} ${result.length === 1 ? 'is' : 'are'} not exist`,
            path: [...(params?.path || []), ...path],
            ...params,
        };
    };

export const validateMarkerPattern = ({
    rootPath,
    objectMarker,
    pathToMarker,
    ctx,
    pathCtx,
}: {
    rootPath: CheckError['rootPath'];
    objectMarker: SettingsMarker;
    pathToMarker: string;
    ctx: zod.RefinementCtx;
    pathCtx: (string | number)[];
}) => {
    if (fs.existsSync(resolve(rootPath, pathToMarker))) {
        const contentOfFile = fs.readFileSync(pathToMarker, 'utf-8');

        if (
            (typeof objectMarker.pattern === 'string' && !contentOfFile.includes(objectMarker.pattern)) ||
            (objectMarker.pattern === RegExp(objectMarker.pattern) && !objectMarker.pattern.test(contentOfFile))
        ) {
            ctx.addIssue({
                code: zod.ZodIssueCode.invalid_date,
                path: [...ctx.path, ...pathCtx],
                message: `the pattern "${objectMarker.pattern}" is not found in the file ${pathToMarker}`,
            });
        }
    }
};
