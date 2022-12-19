// Core
import fs from 'fs';
import { resolve } from 'path';

// Types
import * as types from './types';
import * as typesCommon from '../../types';
import * as typesActions from '../../actions/types';

const ifExistsFileReturnAbsolutePath = ({ PROJECT_ROOT, path }: { PROJECT_ROOT: string, path: string }) => {
    const absolutePath = resolve(PROJECT_ROOT, path);

    if (fs.existsSync(absolutePath)) {
        return absolutePath;
    }

    return path;
};

export const makeAbsolutePath = ({ PROJECT_ROOT, option }: types.MakeAbsolutePath) => {
    let newOption: typesCommon.OptionCustomGen | typesCommon.OptionCLIGenTemplate = option;

    // Setting pathToTemplate
    if (Array.isArray(newOption.pathToTemplate)) {
        newOption.pathToTemplate = newOption.pathToTemplate.map((path) => resolve(PROJECT_ROOT, path));
    }
    if (typeof newOption.pathToTemplate === 'string') {
        newOption.pathToTemplate = resolve(PROJECT_ROOT, newOption.pathToTemplate);
    }

    // Setting outputPath
    if (Array.isArray(newOption.outputPath)) {
        newOption.outputPath = newOption.outputPath.map((path) => resolve(PROJECT_ROOT, path));
    }
    if (typeof newOption.outputPath === 'string') {
        newOption.outputPath = resolve(PROJECT_ROOT, newOption.outputPath);
    }

    // Setting markers
    if (Array.isArray(newOption.markers)) {
        newOption.markers = newOption.markers.map((marker) => {
            let newMarker: typesActions.OptionsMarker = marker;

            // Setting pathToMarker
            if (Array.isArray(newMarker.pathToMarker)) {
                newMarker.pathToMarker = newMarker.pathToMarker.map((path) => {
                    return ifExistsFileReturnAbsolutePath({ PROJECT_ROOT, path });
                });
            }

            if (typeof newMarker.pathToMarker === 'string') {
                newMarker.pathToMarker = resolve(PROJECT_ROOT, newMarker.pathToMarker);
            }

            // Setting markerTemplate
            if (Array.isArray(newMarker.markerTemplate)) {
                newMarker.markerTemplate = newMarker.markerTemplate.map((string) => {
                    return ifExistsFileReturnAbsolutePath({ PROJECT_ROOT, path: string });
                });
            }
            if (typeof newMarker.pathToMarker === 'string') {
                const absolutePath = resolve(PROJECT_ROOT, newMarker.pathToMarker);

                if (fs.existsSync(absolutePath)) {
                    newMarker.pathToMarker = absolutePath;
                }
            }

            return newMarker;
        });
    }
    if (!Array.isArray(newOption.markers) && typeof newOption.markers === 'object') {
        newOption.markers;
    }

    return newOption;
};
