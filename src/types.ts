// Types Utils

// Types
import { GetSelectedName } from './actions/getSelectedName/types';
import { OptionsMarker } from './actions/markers/types';

// Common types
export interface OptionCommonTypes {
    pathToTemplate: string | string[]
    outputPath: string | string[]
    markers?: OptionsMarker[]
    onComplete?: Function
}
export interface Option extends OptionCommonTypes {
    name: string
    stringsReplacers: string[]
}

// Function customGen
export type OptionStringsReplacersCustomGen = {
    replaceVar: string
    value: string
}
export interface OptionCustomGen extends OptionCommonTypes {
    stringsReplacers: OptionStringsReplacersCustomGen | OptionStringsReplacersCustomGen[]
}

// Function CLIGen
export interface OptionCLIGenTemplate extends OptionCommonTypes {
    stringsReplacers: string | string[]
}
export type OptionCLIGen = {
    name: string
    templates: OptionCLIGenTemplate[]
}

// Function mainActions
export type MainActions = {
    configItem: OptionCustomGen | OptionCLIGenTemplate
    selectedNames: GetSelectedName | GetSelectedName[]
    PROJECT_ROOT: string
}
