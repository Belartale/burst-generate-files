// Core
import fs from 'fs';
import { resolve } from 'path';
import { z as zod } from 'zod';

// Utils
import { checkRefineCallback, getRefineParams, validateMarkerPattern } from './utils';

// Types
import { SettingCLIGenTemplate, SettingCustomGen } from '../../types';
import { SettingsMarker } from '../types';
import { CheckError } from './types';

export const getSchemaMarkers = (rootPath: CheckError['rootPath'], path?: zod.CustomErrorParams['path']): zod.ZodType<SettingsMarker[]> =>
    zod.array(
        zod.object({
            pattern: zod.union([zod.string(), zod.instanceof(RegExp)]),
            pathToMarker: zod
                .union([zod.string(), zod.array(zod.string())])
                .refine(checkRefineCallback(rootPath), getRefineParams(rootPath, { path })),
            markerTemplate: zod
                .union([zod.string(), zod.array(zod.string())])
                .refine(checkRefineCallback(rootPath), getRefineParams(rootPath, { path })),
            genDirection: zod.enum(['after', 'before']).optional(),
            onceInsert: zod.boolean().optional(),
        }),
    );

export const commonSchemaOfOptionalSettings = {
    rootPath: zod
        .string()
        .refine(
            (path) => typeof path === 'string' && fs.existsSync(resolve(path)),
            (path) => ({ message: `${path} is not exist` }),
        )
        .optional(),
};

export const schemaOutputPath = {
    outputPath: zod.union([zod.string(), zod.array(zod.string())]),
};

export const getCommonSchema = (rootPath: CheckError['rootPath']) => ({
    pathToTemplate: zod.union([zod.string(), zod.array(zod.string())]),
    ...schemaOutputPath,
    markers: getSchemaMarkers(rootPath).optional(),
    onComplete: zod.function().args(zod.unknown()).returns(zod.void()).optional(),
});

export const validateMarkerPatterns = ({
    settings,
    pathCtx,
    ctx,
    rootPath,
}: {
    settings:
        | Pick<SettingCustomGen, 'markers' | 'outputPath'>[]
        | Pick<SettingCLIGenTemplate, 'markers' | 'outputPath' | 'selectDirectory'>[];
    pathCtx?: (string | number)[];
    ctx: zod.RefinementCtx;
    rootPath: CheckError['rootPath'];
}) => {
    settings.forEach((template, indexTemplate) => {
        if (template.markers && template.outputPath && !(template as SettingCLIGenTemplate).selectDirectory) {
            template.markers.forEach((objectMarker, indexOfObjectMarker) => {
                if (Array.isArray(objectMarker.pathToMarker)) {
                    objectMarker.pathToMarker.forEach((pathToMarker, indexOfPathToMarker) => {
                        validateMarkerPattern({
                            rootPath,
                            objectMarker,
                            pathToMarker,
                            ctx,
                            pathCtx: [...(pathCtx || []), indexTemplate, 'markers', indexOfObjectMarker, pathToMarker, indexOfPathToMarker],
                        });
                    });
                } else {
                    validateMarkerPattern({
                        rootPath,
                        objectMarker,
                        pathToMarker: objectMarker.pathToMarker,
                        ctx,
                        pathCtx: [...(pathCtx || []), indexTemplate, 'markers', indexOfObjectMarker, 'pathToMarker'],
                    });
                }
            });
        }
    });
};
