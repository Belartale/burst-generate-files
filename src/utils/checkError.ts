// Core
import * as yup from 'yup';

// Types
import * as types from '../types';

export const checkError = (PROJECT_ROOT: string, options: types.Option[]) => {
    const schemaRoot = yup.string()
        .test({
            name:    'firstArgument',
            message: 'First argument must be string',
            test:    (value) => typeof value === 'string',
        });

    schemaRoot.validateSync(PROJECT_ROOT, { abortEarly: false });

    options.forEach((option) => {
        const schemaOption = yup.object({
            name:             yup.string().required(),
            stringsReplacers: yup.array().required(),
            pathToTemplate:   yup.string().required(),
            outputPath:       yup.string().required(),
            markers:          yup.array(),
            onComplete:       yup.object(),
        });
        schemaOption.validateSync(option, { abortEarly: false });

        if (option.markers) {
            option.markers.forEach((markersObject) => {
                const schemaDddMarkerFiles = yup.object({
                    pathToMarker: yup.string().required(),
                    marker:       yup.string().required(),
                    regExp:       yup.object({
                        value: yup.string(),
                        flags: yup.string(),
                    }),
                    whereInsertMarker: yup.string(),
                    markerTemplate:    yup.string().required(),
                    onceInsert:        yup.boolean(),
                });
                schemaDddMarkerFiles.validateSync(markersObject, { abortEarly: false });
            });
        }
    });
};
