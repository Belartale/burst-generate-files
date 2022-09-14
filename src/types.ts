// File index
// Common types
export type Option = {
    name:      string
    stringsReplacers:    string[]
    pathTemplate:       string
    outputPath:         string
    addRowFiles?: OptionsGenerateRow[]
    onComplete?:        Function
}

// Function mainActions
export type MainActions = {
    configItem: Option | OptionOG
    selectedNames: GetSelectedName[]
    PROJECT_ROOT: string
}

// Function generation
export type OptionGStringsReplacers = {
    string: string
    newString: string
}

export interface OptionOG extends Omit<Option, 'name' | 'stringsReplacers'> {
    stringsReplacers: OptionGStringsReplacers | Array<OptionGStringsReplacers>
}

// Function generationCLI
export interface OptionOCLI extends Omit<Option, 'stringsReplacers'> {
    stringsReplacers: string | string[]
}

// File makeAbsolutePath
export type MakeAbsolutePath = {
    PROJECT_ROOT: string
    option: Option | OptionOG | OptionOCLI
}

// File replaceWordCase
export type ReplaceWordCase = {
    string: string
    stringsForReplace: Array<GetSelectedName>
}

// File getSelectedItem
export type GetSelectedItem = OptionOCLI[]

// File getSelectedName
export type GetSelectedName = {
    string: string
    newString: string
}

// File createFiles
export type CreateFiles = {
    fromFolderPath: string
    toPath: string
    selectedNames: GetSelectedName[]
}

// File addRowFiles
export type AddRowFiles = {
    addRowFiles: OptionsGenerateRow[]
    outputPath: Option['outputPath']
    selectedNames: GetSelectedName[]
}

export type OptionsGenerateRow = {
    pathFromOutputPath: string
    marker: string | {
        value: string
        flags: string
    }
    whereInsertRow?: 'after marker' | 'before marker'
    generationRow: string
    onceInsertRow?: boolean
}
export type CheckIsOnceInsertRow = {
    optionsGenerateRow: OptionsGenerateRow
    fileNameConfig: string
}
export type GenerateFiles = {
    id: {
        pathFromOutputPath: string
        marker: string
        generationRow: string
    },
    wasInsertRow: boolean
}

// Function defineMarkerAndAddRow
export type DefineMarkerAndAddRow = {
    optionsGenerateRow: OptionsGenerateRow
    dataRedFile: string
    tabs: string
}

// Function addConfigToFile
export type AddConfigToFile = {
    optionsGenerateRow: OptionsGenerateRow
    fileNameConfig: string
}


// File onComplete
export type OnComplete = {
    configItem: Option | OptionOG | OptionOCLI
    selectedNames: GetSelectedName[]
}
