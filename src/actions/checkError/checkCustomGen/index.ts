// Core
import { z as zod } from 'zod';

// Utils
import { createErrorsZod } from '../../../utils';

// Schemas
import { commonSchemaOfOptionalSettings, getCommonSchema, validateMarkerPatterns } from '../schemas';

// Types
import { CreateErrorsZod } from '../../../utils/types';
import { OptionalSettingsCustomGen, SettingCustomGen, SettingStringsReplacersCustomGen } from '../../../types';
import { CheckError } from '../types';

export const checkCustomGen = ({ settings, optionalOfSettings, rootPath }: CheckError<SettingCustomGen[], OptionalSettingsCustomGen>) => {
    const errors: CreateErrorsZod['errors'] = [];

    const schemaStringsReplacers: zod.ZodType<SettingStringsReplacersCustomGen> = zod.object({
        replaceVar: zod.string(),
        value: zod.string(),
    });

    const schemaSettings: zod.ZodType<SettingCustomGen[]> = zod
        .array(
            zod.object({
                stringsReplacers: zod.union([schemaStringsReplacers, zod.array(schemaStringsReplacers)]),
                selectDirectory: zod.undefined(), // todo need? How to show that this field is not needed? (only for CustomGen)
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

    const schemaOptionalSettings: zod.ZodType<OptionalSettingsCustomGen | undefined> = zod
        .object({
            ...commonSchemaOfOptionalSettings,
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
