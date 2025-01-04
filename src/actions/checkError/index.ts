// Core
import fs from 'fs';
import { resolve } from 'path';
import { z as zod } from 'zod';

// Utils
import { createErrorsZod } from '../../utils';

// Functions
import { getSchemaMarkers } from './schemas';

// Types
import { CheckError, GetRefineParams } from './types';
import { SettingsMarker } from '../types';
import { CreateErrorsZod } from '../../utils/types';

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

export const checkError = ({ settings, optionalOfSettings, rootPath }: CheckError) => {
    const errors: CreateErrorsZod['errors'] = [];

    const verifyMarkerPatternInFile = ({
        objectMarker,
        pathToMarker,
        ctx,
        pathCtx,
    }: {
        objectMarker: SettingsMarker;
        pathToMarker: string;
        ctx: zod.RefinementCtx;
        pathCtx: (string | number)[];
    }) => {
        if (fs.existsSync(resolve(rootPath, pathToMarker))) {
            const contentOfFile = fs.readFileSync(pathToMarker, 'utf-8');

            if (
                (typeof objectMarker.pattern === 'string' && !contentOfFile.includes(objectMarker.pattern)) ||
                (objectMarker.pattern === RegExp(objectMarker.pattern) && objectMarker.pattern.test(contentOfFile))
            ) {
                ctx.addIssue({
                    code: zod.ZodIssueCode.invalid_date,
                    path: [...ctx.path, ...pathCtx],
                    message: `the pattern "${objectMarker.pattern}" is not found in the file ${pathToMarker}`,
                });
            }
        }
    };

    const schemaSettings = zod
        .array(
            zod.object({
                // todo Zod + TypeScript !!! How ?
                name: zod.string(),
                templates: zod.array(
                    zod.object({
                        stringsReplacers: zod.string().or(zod.array(zod.string())),
                        outputPath: zod.string().or(zod.array(zod.string())).optional(),
                        pathToTemplate: zod
                            .string()
                            .or(zod.array(zod.string()))
                            .refine(checkRefineCallback(rootPath), getRefineParams(rootPath)),
                        selectDirectory: zod.boolean().optional(),
                        markers: getSchemaMarkers(rootPath).optional(),
                        onComplete: zod.function().optional(),
                    }),
                ),
            }),
        )
        .superRefine((arraySettings, ctx) => {
            arraySettings.forEach((setting, indexSetting) => {
                setting.templates.forEach((template, indexTemplate) => {
                    if (template.outputPath && !template.selectDirectory && template.markers) {
                        template.markers.forEach((objectMarker, indexOfObjectMarker) => {
                            if (Array.isArray(objectMarker.pathToMarker)) {
                                objectMarker.pathToMarker.forEach((pathToMarker, indexOfPathToMarker) => {
                                    verifyMarkerPatternInFile({
                                        objectMarker,
                                        pathToMarker,
                                        ctx,
                                        pathCtx: [
                                            indexSetting,
                                            'templates',
                                            indexTemplate,
                                            'markers',
                                            indexOfObjectMarker,
                                            pathToMarker,
                                            indexOfPathToMarker,
                                        ],
                                    });
                                });
                            } else {
                                verifyMarkerPatternInFile({
                                    objectMarker,
                                    pathToMarker: objectMarker.pathToMarker,
                                    ctx,
                                    pathCtx: [indexSetting, 'templates', indexTemplate, 'markers', indexOfObjectMarker, 'pathToMarker'],
                                });
                            }
                        });
                    }
                });
            });
        });

    const schemaOptionalSettings = zod
        .object({
            // todo Zod + TypeScript !!! How ?
            rootPath: zod
                .string()
                .refine(
                    (path) => typeof path === 'string' && fs.existsSync(resolve(path)),
                    (path) => ({ message: `${path} is not exist` }),
                )
                .optional(),
            showFullError: zod.boolean().optional(),
        })
        .optional();

    const validationResultSettings = schemaSettings.safeParse(settings);
    const validationResultOptionalSettings = schemaOptionalSettings.safeParse(optionalOfSettings);

    errors.push(
        ...createErrorsZod({
            validationResult: validationResultSettings,
            whichParameter: 'first',
            errors,
        }),
        ...createErrorsZod({
            validationResult: validationResultOptionalSettings,
            whichParameter: 'second',
            errors,
        }),
    );

    // Errors
    if (errors.length > 0) {
        throw errors;
    }
};
