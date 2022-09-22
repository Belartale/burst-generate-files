// Core
import { resolve } from 'path';

// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export const makeAbsolutePath = ({ PROJECT_ROOT, option }: types.MakeAbsolutePath) => {
    // let newOption: typesCommon.OptionCustomGen | typesCommon.OptionCLIGenTemplate = JSON.parse(JSON.stringify(option));
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
            // let newMarker: types.OptionsMarker = JSON.parse(JSON.stringify(marker));
            let newMarker: types.OptionsMarker = marker;

            //Setting pathToMarker
            if (Array.isArray(newMarker.pathToMarker)) {
                newMarker.pathToMarker = newMarker.pathToMarker.map((path) => resolve(PROJECT_ROOT, path));
            }

            if (typeof newMarker.pathToMarker === 'string') {
                newMarker.pathToMarker = resolve(PROJECT_ROOT, newMarker.pathToMarker);
            }

            return newMarker;
        });
    }
    if (!Array.isArray(newOption.markers) && typeof newOption.markers === 'object') {
        newOption.markers;
    }

    return newOption;
};
