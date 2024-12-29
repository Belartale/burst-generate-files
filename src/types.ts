// Types Actions
import { GetSelectedName } from './actions/getSelectedName/types';
import { SettingsMarker } from './actions/markers/types';

// Common types
export interface SettingCommonTypes {
    pathToTemplate: string | string[];
    selectDirectory?: boolean; //todo remove for customGen
    markers?: SettingsMarker[];
    onComplete?: (result: unknown) => void; // todo add result type !!!
}

export type OutputPath = string | string[];
export interface InterfaceOutputPath {
    outputPath: OutputPath;
}

// export interface Setting extends SettingCommonTypes {
//     name: string
//     stringsReplacers: string[]
// }

export type OptionalSettings = {
    rootPath?: string;
    showFullError?: boolean;
};

// Function customGen
export type SettingStringsReplacersCustomGen = {
    replaceVar: string;
    value: string;
};
export interface SettingCustomGen extends SettingCommonTypes, InterfaceOutputPath {
    stringsReplacers: SettingStringsReplacersCustomGen | SettingStringsReplacersCustomGen[];
}

// Function CLIGen
export interface SettingCLIGenTemplate extends SettingCommonTypes, Partial<InterfaceOutputPath> {
    stringsReplacers: string | string[];
}
export type SettingCLIGen = {
    name: string;
    templates: SettingCLIGenTemplate[];
};

// Required OutputPath
export interface SettingCLIGenTemplateRequiredOutputPath extends SettingCommonTypes, InterfaceOutputPath {
    stringsReplacers: string | string[];
}
export type SettingCLIGenRequiredOutputPath = {
    name: string;
    templates: SettingCLIGenTemplateRequiredOutputPath[];
};

// Function mainActions
export type MainActions = {
    setting: SettingCustomGen | SettingCLIGenTemplateRequiredOutputPath;
    selectedNames: GetSelectedName | GetSelectedName[];
    PROJECT_ROOT: string;
};
