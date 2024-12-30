// Core
import fs from 'fs';
import { resolve } from 'path';
import { z } from 'zod';

// Constants
import { CUSTOM_ERROR } from '../../constants';

// Types
import { CheckError, CustomErrors } from './types';

const betweenTwoLines = `:\n`;

export const checkError = ({ settings, optionalSettings, PROJECT_ROOT }: CheckError) => {
    const errors: CustomErrors = [];

    const checkRefineCallback = (path: string | string[]): path is string | string[] => {
        if (Array.isArray(path)) {
            return path.every((p) => fs.existsSync(resolve(PROJECT_ROOT, p)));
        }

        return fs.existsSync(resolve(PROJECT_ROOT, path));
    };

    const messageRefineCallback = (path: string | string[]) => {
        const arrayPathToTemplate = [path].flat(Infinity);
        const result = arrayPathToTemplate.flat(Infinity).filter((p) => typeof p === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, p)));

        return { message: `${result.join(', ')} ${result.length === 1 ? 'is' : 'are'} not exist` };
    };

    const schemaSettings = z.array(
        z.object({
            // todo Zod + TypeScript !!! How ?
            name: z.string(),
            templates: z.array(
                z.object({
                    stringsReplacers: z.string().or(z.array(z.string())),
                    outputPath: z.string().or(z.array(z.string())).optional(),
                    pathToTemplate: z.string().or(z.array(z.string())).refine(checkRefineCallback, messageRefineCallback),
                    selectDirectory: z.boolean().optional(),
                    markers: z
                        .array(
                            z.object({
                                pattern: z.string().or(z.instanceof(RegExp)),
                                pathToMarker: z.string().or(z.array(z.string())).refine(checkRefineCallback, messageRefineCallback),
                                markerTemplate: z.string().or(z.array(z.string())).refine(checkRefineCallback, messageRefineCallback),
                                genDirection: z.enum(['after', 'before']).optional(),
                                onceInsert: z.boolean().optional(),
                            }),
                        )
                        .optional(),
                    onComplete: z.function().optional(),
                }),
            ),
        }),
    );

    const schemaOptionalSettings = z
        .object({
            // todo Zod + TypeScript !!! How ?
            rootPath: z
                .string()
                .refine(
                    (path) => typeof path === 'string' && fs.existsSync(resolve(path)),
                    (path) => ({ message: `${path} is not exist` }),
                )
                .optional(),
            showFullError: z.boolean().optional(),
        })
        .optional();

    const validationResultSettings = schemaSettings.safeParse(settings);
    const validationResultOptionalSettings = schemaOptionalSettings.safeParse(optionalSettings);

    const createError = (validationResult: z.SafeParseReturnType<unknown, unknown>, whichParameter: string) => {
        if (!validationResult.success) {
            validationResult.error.errors.forEach((objError) => {
                const objErrorPath = `>>> at the ${whichParameter} parameter of the function: ${objError.path.join('.')} <<<`;

                const newError = new Error(`${objError.code}: ${objError.message + betweenTwoLines + objErrorPath}`, {
                    cause: objError.message,
                });
                newError.name = CUSTOM_ERROR;

                errors.push(newError);
            });
        }
    };

    createError(validationResultSettings, 'first');
    createError(validationResultOptionalSettings, 'second');

    // Errors
    if (errors.length > 0) {
        throw errors;
    }
};
