// File index
export type OptionsGenerateRow = {
    pathFromOutputPath: string
    marker: string
    regExp?: {
        value: string
        flags: string
    }
    whereInsertRow?: 'after marker' | 'before marker'
    generationRow: string
    onceInsertRow?: boolean
}

// File replaceWordCase
export type ReplaceWordCase = {
    string: string
    arrayStringAndNewString: Array<{
        string: string
        newString: string[]
    }>
}

// File getSelectedItem
export type GetSelectedItem = {
    options: GenerateOptionsItem[]
    PROJECT_ROOT: string
}
export type GenerateOptionsItem = {
    name:      string
    stringsReplacers:    string[]
    pathTemplate:       string
    outputPath:         string
    addRowFiles?: OptionsGenerateRow[]
    onComplete?:        Function
}

// File getSelectedName
export type GetSelectedName = {
    string: string,
    newString: string[]
}

// File createFiles
export type CreateFiles = {
    fromFolderPath: string
    toPath: string
    selectedNames: GetSelectedName[]
}

// File addRowFiles
export type AddRowFiles = {
    selectedConfigItem: GenerateOptionsItem
    selectedNames: GetSelectedName[]
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

// File onComplete
export type OnComplete = {
    selectedConfigItem: GenerateOptionsItem
    selectedNames: GetSelectedName[]
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
