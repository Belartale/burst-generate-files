// Core
import fs from 'fs';
import { resolve } from 'path';

// Types
import * as types from './types';
import * as typesActions from '../../actions/types';

const ifExistsFileReturnAbsolutePath = ({ rootPath, path }: { rootPath: string; path: string }) => {
    const absolutePath = resolve(rootPath, path);

    if (fs.existsSync(absolutePath)) {
        return absolutePath;
    }

    return path;
};

export const makeAbsolutePath = ({ rootPath, setting }: types.MakeAbsolutePath) => {
    const newSetting: types.MakeAbsolutePath['setting'] = setting;

    // Setting pathToTemplate
    if (Array.isArray(newSetting.pathToTemplate)) {
        newSetting.pathToTemplate = newSetting.pathToTemplate.map((path) => resolve(rootPath, path));
    }
    if (typeof newSetting.pathToTemplate === 'string') {
        newSetting.pathToTemplate = resolve(rootPath, newSetting.pathToTemplate);
    }

    // Setting outputPath
    if (Array.isArray(newSetting.outputPath)) {
        newSetting.outputPath = newSetting.outputPath.map((path) => resolve(rootPath, path));
    }
    if (typeof newSetting.outputPath === 'string') {
        newSetting.outputPath = resolve(rootPath, newSetting.outputPath);
    }

    // Setting markers
    if (Array.isArray(newSetting.markers)) {
        newSetting.markers = newSetting.markers.map((marker) => {
            const newMarker: typesActions.SettingsMarker = marker;

            // Setting pathToMarker
            if (Array.isArray(newMarker.pathToMarker)) {
                newMarker.pathToMarker = newMarker.pathToMarker.map((path) => {
                    return ifExistsFileReturnAbsolutePath({ rootPath, path });
                });
            }

            if (typeof newMarker.pathToMarker === 'string') {
                newMarker.pathToMarker = resolve(rootPath, newMarker.pathToMarker);
            }

            // Setting markerTemplate
            if (Array.isArray(newMarker.markerTemplate)) {
                newMarker.markerTemplate = newMarker.markerTemplate.map((string) => {
                    return ifExistsFileReturnAbsolutePath({ rootPath, path: string });
                });
            }
            if (typeof newMarker.pathToMarker === 'string') {
                const absolutePath = resolve(rootPath, newMarker.pathToMarker);

                if (fs.existsSync(absolutePath)) {
                    newMarker.pathToMarker = absolutePath;
                }
            }

            return newMarker;
        });
    }

    return newSetting;
};
