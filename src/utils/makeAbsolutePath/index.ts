// Core
import fs from 'fs';
import { resolve } from 'path';

// Types
import * as types from './types';
import * as typesActions from '../../actions/types';

const ifExistsFileReturnAbsolutePath = ({ PROJECT_ROOT, path }: { PROJECT_ROOT: string, path: string }) => {
    const absolutePath = resolve(PROJECT_ROOT, path);

    if (fs.existsSync(absolutePath)) {
        return absolutePath;
    }

    return path;
};

export const makeAbsolutePath = ({ PROJECT_ROOT, setting }: types.MakeAbsolutePath) => {
    let newSetting: types.MakeAbsolutePath['setting'] = setting;

    // Setting pathToTemplate
    if (Array.isArray(newSetting.pathToTemplate)) {
        newSetting.pathToTemplate = newSetting.pathToTemplate.map((path) => resolve(PROJECT_ROOT, path));
    }
    if (typeof newSetting.pathToTemplate === 'string') {
        newSetting.pathToTemplate = resolve(PROJECT_ROOT, newSetting.pathToTemplate);
    }

    // Setting outputPath
    if (Array.isArray(newSetting.outputPath)) {
        newSetting.outputPath = newSetting.outputPath.map((path) => resolve(PROJECT_ROOT, path));
    }
    if (typeof newSetting.outputPath === 'string') {
        newSetting.outputPath = resolve(PROJECT_ROOT, newSetting.outputPath);
    }

    // Setting markers
    if (Array.isArray(newSetting.markers)) {
        newSetting.markers = newSetting.markers.map((marker) => {
            let newMarker: typesActions.SettingsMarker = marker;

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
    if (!Array.isArray(newSetting.markers) && typeof newSetting.markers === 'object') {
        newSetting.markers;
    }

    return newSetting;
};
