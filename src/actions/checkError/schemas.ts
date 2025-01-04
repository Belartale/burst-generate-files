// Core
import { z as zod } from 'zod';

// Functions
import { checkRefineCallback, getRefineParams } from '.';

// Types
import { CheckError } from './types';

export const getSchemaMarkers = (rootPath: CheckError['rootPath'], path?: zod.CustomErrorParams['path']) =>
    zod.array(
        zod.object({
            pattern: zod.string().or(zod.instanceof(RegExp)),
            pathToMarker: zod
                .string()
                .or(zod.array(zod.string()))
                .refine(checkRefineCallback(rootPath), getRefineParams(rootPath, { path })),
            markerTemplate: zod
                .string()
                .or(zod.array(zod.string()))
                .refine(checkRefineCallback(rootPath), getRefineParams(rootPath, { path })),
            genDirection: zod.enum(['after', 'before']).optional(),
            onceInsert: zod.boolean().optional(),
        }),
    );
