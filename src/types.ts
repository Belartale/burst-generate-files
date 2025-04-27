// Types Actions
import { GetSelectedName } from './actions/getSelectedName/types';
import { CreateMarkers, SettingsMarker } from './actions/createMarkers/types';

// Common types
export interface SettingCommonTypes {
    pathToTemplate: string | string[];
    selectDirectory?: boolean;
    markers?: SettingsMarker[];
    onComplete?: null | (({ init, result }: { init: unknown; result: unknown }) => void); // todo add types !!!
}

export type OutputPath = string | string[];
export interface InterfaceOutputPath {
    outputPath: OutputPath;
}

// Function customGen
export type SettingStringsReplacersCustomGen = {
    replaceVar: string;
    value: string;
};
export interface SettingCustomGen extends Omit<SettingCommonTypes, 'selectDirectory'>, InterfaceOutputPath {
    stringsReplacers: SettingStringsReplacersCustomGen | SettingStringsReplacersCustomGen[];
}

export type OptionalSettingsCustomGen = Omit<OptionalSettingsCLIGen, 'showFullError'>;

// Function CLIGen
export interface SettingCLIGenTemplate extends SettingCommonTypes, Partial<InterfaceOutputPath> {
    stringsReplacers: string | string[];
}
export type SettingCLIGen = {
    name: string;
    templates: SettingCLIGenTemplate[];
};

export type OptionalSettingsCLIGen = {
    rootPath?: string;
    showFullError?: boolean;
};

// Required OutputPath
export interface SettingCLIGenTemplateRequiredOutputPath extends SettingCommonTypes, InterfaceOutputPath {
    stringsReplacers: string | string[];
}
export type SettingCLIGenRequiredOutputPath = {
    name: string;
    templates: SettingCLIGenTemplateRequiredOutputPath[];
};

// Function markersGen
export type SettingMarkersGen = Omit<CreateMarkers, 'rootPath'>;
export type OptionalSettingsMarkersGen = Partial<Pick<CreateMarkers, 'rootPath'>>;

// Function mainActions
export type MainActions = {
    initSetting: SettingCustomGen | SettingCLIGenTemplateRequiredOutputPath;
    setting: SettingCustomGen | SettingCLIGenTemplateRequiredOutputPath;
    selectedNames: GetSelectedName | GetSelectedName[];
    rootPath: string;
};
