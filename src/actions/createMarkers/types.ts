// Re-export
export * from './collectorTemplates/types';

// Types
import * as typesActions from '../types';

export type CreateMarkers = {
    markers: SettingsMarker[];
    selectedNames: typesActions.GetSelectedName | typesActions.GetSelectedName[];
    rootPath: string;
};
export type SettingsMarker = {
    pattern: string | RegExp;
    pathToMarker: string | string[];
    markerTemplate: string | string[];
    genDirection?: 'after' | 'before';
    onceInsert?: boolean;
};
export type CheckIsOnceInsertMarker = {
    settingsMarker: SettingsMarker;
    nameConfigGenerateForOnceInsert: string;
};
export type GenerateFiles = {
    id: {
        pattern: typesActions.SettingsMarker['pattern'];
        pathToMarker: typesActions.SettingsMarker['pathToMarker'];
        markerTemplate: typesActions.SettingsMarker['markerTemplate'];
    };
    onceInsert: boolean;
};

// Function defineMarkerAndAddMarkerTemplate
export type DefineMarkerAndAddMarkerTemplate = {
    settingsMarker: SettingsMarker;
    dataRedFile: string;
};

// Function addConfigToFile
export type AddConfigToFile = {
    settingsMarker: SettingsMarker;
    nameConfigGenerateForOnceInsert: string;
};
