// File index
// Common types
interface OptionCommonTypes {
    pathToTemplate: string
    outputPath: string
    markers?: OptionsMarker[]
    onComplete?: Function
}
export interface Option extends OptionCommonTypes {
    name: string
    stringsReplacers: string[]
}

// Function mainActions
export type MainActions = {
    configItem: Option | OptionCustomGenO | OptionCLIGenO
    selectedNames: GetSelectedName | GetSelectedName[]
    PROJECT_ROOT: string
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
export interface OptionCLIGenO extends OptionCommonTypes {
    name: string
    stringsReplacers: string | string[]
}

// File makeAbsolutePath
export type MakeAbsolutePath = {
    PROJECT_ROOT: string
    option: Option | OptionCustomGenO | OptionCLIGenO
}

// File replaceWordCase
export type Cases = {
    stringReplace: GetSelectedName
    result: string
}

export type ReplaceWordCase = {
    string: string
    stringsForReplace: GetSelectedName | GetSelectedName[]
}

// File getSelectedItem
export type GetSelectedItem = OptionCLIGenO[]

// File getSelectedName
// Function getName
export type GetName = {
    replaceVar: string
    result: GetSelectedName[]
}

// Function getSelectedName
export type GetSelectedName = {
    replaceVar: string
    value: string
}

// File createFiles
export type CreateFiles = {
    fromFolderPath: string
    toPath: string
    selectedNames: GetSelectedName | GetSelectedName[]
}

// File markers
export type AddMarkerFiles = {
    markers: OptionsMarker[]
    selectedNames: GetSelectedName | GetSelectedName[]
    PROJECT_ROOT: string
}
export type OptionsMarker = {
    pattern: string | RegExp
    pathToMarker: string
    markerTemplate: string | string[]
    genDirection?: 'after' | 'before'
    onceInsert?: boolean
}
export type CheckIsOnceInsertMarker = {
    optionsMarker: OptionsMarker
    configGenerateNameForOnceInsert: string
}
export type GenerateFiles = {
    id: {
        pathToMarker: string
        pattern: string
        markerTemplate: string | string[]
    },
    onceInsert: boolean
}

// Function defineMarkerAndAdd
export type DefineMarkerAndAdd = {
    optionsMarker: OptionsMarker
    dataRedFile: string
}

// Function addConfigToFile
export type AddConfigToFile = {
    optionsMarker: OptionsMarker
    configGenerateNameForOnceInsert: string
}

// File onComplete
export type OnComplete = {
    configItem: Option | OptionCustomGenO | OptionCLIGenO
    selectedNames: GetSelectedName | GetSelectedName[]
}
