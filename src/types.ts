import * as types from './utils/types';

// Common types
interface OptionCommonTypes {
    pathToTemplate: string
    outputPath: string
    markers?: types.OptionsMarker[]
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
export interface OptionCustomGenO extends OptionCommonTypes {
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
    configItem: OptionCLIGenTemplate // OptionCustomGenO
    selectedNames: types.GetSelectedName | types.GetSelectedName[]
    PROJECT_ROOT: string
}
