// Core
import { z as zod } from 'zod';

// Utils
import { createErrorsZod } from '../../../utils';

// Schemas
import { commonSchemaOfOptionalSettings, getCommonSchema, getSchemaMarkers, schemaOutputPath, validateMarkerPatterns } from '../schemas';

// Types
import { CreateErrorsZod } from '../../../utils/types';
import { OptionalSettingsCLIGen, SettingCLIGen, SettingCLIGenTemplate } from '../../../types';
import { CheckError } from '../types';

export const checkCLIGen = ({ settings, optionalOfSettings, rootPath }: CheckError<SettingCLIGen[], OptionalSettingsCLIGen>) => {
    const errors: CreateErrorsZod['errors'] = [];

    const schemaSettings: zod.ZodType<SettingCLIGen[]> = zod
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

    const schemaOptionalSettings: zod.ZodType<OptionalSettingsCLIGen | undefined> = zod
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

export const checkMarkersOfCLIGen = ({
    settings: template,
    rootPath,
    index,
}: CheckError<Pick<SettingCLIGenTemplate, 'outputPath' | 'markers'>> & { index: number }) => {
    const errors: CreateErrorsZod['errors'] = [];

    const schema: zod.ZodType<Pick<SettingCLIGenTemplate, 'outputPath' | 'markers'>> = zod
        .object({
            ...schemaOutputPath,
            markers: getSchemaMarkers(rootPath).optional(),
        })
        .superRefine((templateOfSuperRefine, ctx) => {
            validateMarkerPatterns({
                settings: [templateOfSuperRefine],
                pathCtx: [index, 'templates'],
                ctx,
                rootPath,
            });
        });

    const validationResultSettings = schema.safeParse(template);

    errors.push(
        ...createErrorsZod({
            validationResult: validationResultSettings,
            whichParameter: 'first',
            errors,
        }),
    );

    // Errors
    if (errors.length > 0) {
        throw errors;
    }
};
