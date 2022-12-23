// Types Actions
import { GetSelectedName } from './actions/getSelectedName/types';
import { SettingsMarker } from './actions/markers/types';

// Common types
export interface SettingCommonTypes {
    pathToTemplate: string | string[]
    outputPath: string | string[]
    selectDirectory?: boolean
    markers?: SettingsMarker[]
    onComplete?: Function
}
export interface Setting extends SettingCommonTypes {
    name: string
    stringsReplacers: string[]
}

export type OptionalSettings = {
    rootPath?: string
}

// Function customGen
export type SettingStringsReplacersCustomGen = {
    replaceVar: string
    value: string
}
export interface SettingCustomGen extends SettingCommonTypes {
    stringsReplacers: SettingStringsReplacersCustomGen | SettingStringsReplacersCustomGen[]
}

// Function CLIGen
export interface SettingCLIGenTemplate extends SettingCommonTypes {
    stringsReplacers: string | string[]
}
export type SettingCLIGen = {
    name: string
    templates: SettingCLIGenTemplate[]
}

// Function mainActions
export type MainActions = {
    setting: SettingCustomGen | SettingCLIGenTemplate
    selectedNames: GetSelectedName | GetSelectedName[]
    PROJECT_ROOT: string
}
