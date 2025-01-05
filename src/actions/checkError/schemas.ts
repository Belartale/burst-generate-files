// Core
import fs from 'fs';
import { resolve } from 'path';
import { z as zod } from 'zod';

// Utils
import { checkRefineCallback, getRefineParams, validateMarkerPattern } from './utils';

// Types
import { SettingCLIGen, SettingCLIGenTemplate, SettingCustomGen, SettingStringsReplacersCustomGen } from '../../types';
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

const schemaStringsReplacers: zod.ZodType<SettingStringsReplacersCustomGen> = zod.object({
    replaceVar: zod.string(),
    value: zod.string(),
});

export const commonSchemaOfOptionalSettings = {
    rootPath: zod
        .string()
        .refine(
            (path) => typeof path === 'string' && fs.existsSync(resolve(path)),
            (path) => ({ message: `${path} is not exist` }),
        )
        .optional(),
};

const getCommonSchema = (rootPath: CheckError['rootPath']) => ({
    pathToTemplate: zod.union([zod.string(), zod.array(zod.string())]),
    outputPath: zod.union([zod.string(), zod.array(zod.string())]),
    markers: getSchemaMarkers(rootPath).optional(),
    onComplete: zod.function().args(zod.unknown()).returns(zod.void()).optional(),
});

const validateMarkerPatterns = ({
    settings,
    pathCtx,
    ctx,
    rootPath,
}: {
    settings: SettingCustomGen[] | SettingCLIGenTemplate[];
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

export const getSchemaCustomGen = (rootPath: CheckError['rootPath']): zod.ZodType<SettingCustomGen[]> =>
    zod
        .array(
            zod.object({
                stringsReplacers: zod.union([schemaStringsReplacers, zod.array(schemaStringsReplacers)]),
                selectDirectory: zod.undefined(),
                ...getCommonSchema(rootPath),
            }),
        )
        .superRefine((arraySettings, ctx) => {
            validateMarkerPatterns({
                settings: arraySettings,
                pathCtx: [],
                ctx,
                rootPath,
            });
        });

export const getSchemaCLIGen = (rootPath: CheckError['rootPath']): zod.ZodType<SettingCLIGen[]> =>
    zod
        .array(
            zod.object({
                name: zod.string(),
                templates: zod.array(
                    zod.object({
                        stringsReplacers: zod.union([zod.string(), zod.array(zod.string())]),
                        selectDirectory: zod.boolean().optional(),
                        ...getCommonSchema(rootPath),
                    }),
                ),
            }),
        )
        .superRefine((arraySettings, ctx) => {
            arraySettings.forEach((setting, indexSetting) => {
                validateMarkerPatterns({
                    settings: setting.templates,
                    pathCtx: [indexSetting, 'templates'],
                    ctx,
                    rootPath,
                });
            });
        });
