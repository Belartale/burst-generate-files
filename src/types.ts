// File index
// Common types
export type Option = {
    name:      string
    stringsReplacers:    string[]
    pathToTemplate:       string
    outputPath:         string
    markers?: OptionsMarker[]
    onComplete?:        Function
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

export interface OptionCustomGenO extends Omit<Option, 'name' | 'stringsReplacers'> {
    stringsReplacers: OptionStringsReplacersCustomGen | Array<OptionStringsReplacersCustomGen>
}

// Function CLIGen
export interface OptionCLIGenO extends Omit<Option, 'stringsReplacers'> {
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
    pathToMarker: string
    marker: string | {
        value: string
        regExpValue: string
        regExpFlags?: string
    }
    whereInsertMarker?: 'after marker' | 'before marker'
    markerTemplate: string
    onceInsert?: boolean
}
export type CheckIsOnceInsertMarker = {
    optionsMarker: OptionsMarker
    fileNameConfig: string
}
export type GenerateFiles = {
    id: {
        pathToMarker: string
        marker: string
        markerTemplate: string
    },
    wasInsertMarker: boolean
}

// Function defineMarkerAndAdd
export type DefineMarkerAndAdd = {
    optionsMarker: OptionsMarker
    dataRedFile: string
    tabs: string
}

// Function addConfigToFile
export type AddConfigToFile = {
    optionsMarker: OptionsMarker
    fileNameConfig: string
}

// File onComplete
export type OnComplete = {
    configItem: Option | OptionCustomGenO | OptionCLIGenO
    selectedNames: GetSelectedName | GetSelectedName[]
}
