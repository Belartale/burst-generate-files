export type TypesOptionsGenerationRow = {
    pathFromOutputPath: string
    marker: string
    whereInsertRow?: 'after marker' | 'before marker'
    generationRow: string
}

export type TypesGenerateOptionsItem = {
    name:      string
    stringReplacers:    string
    pathTemplate:       string
    outputPath:         string
    addRowFiles?: TypesOptionsGenerationRow[]
    onComplete?:        Function
}

export type TypesGetSelectedName = string[]

export type TypesCreateFiles = {
    fromFolderPath: string
    toPath: string
    selectedConfigItem: {
        pathTemplate: string,
        name: string,
        stringReplacers: string,
        outputPath: string
    }
    selectedName: TypesGetSelectedName
};

export type TypesReplaceWordCase = {
    string: string
    stringReplacers: string
    selectedName: TypesGetSelectedName
}

export type TypesAddRowFiles = {
    selectedConfigItem: TypesGenerateOptionsItem
    selectedName: TypesGetSelectedName
}
export type TypesDefineMarkerAndAddRow = {
    element: TypesOptionsGenerationRow
    dataRedFile: string
    tabs: string
}
