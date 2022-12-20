// Re-export
export * from './collectorTemplates/types';

// Types
import * as typesActions from '../types';

export type AddMarkerFiles = {
    markers: OptionsMarker[]
    selectedNames: typesActions.GetSelectedName | typesActions.GetSelectedName[]
    PROJECT_ROOT: string
}
export type OptionsMarker = {
    pattern: string | RegExp
    pathToMarker: string | string[]
    markerTemplate: string | string[]
    genDirection?: 'after' | 'before'
    onceInsert?: boolean
}
export type CheckIsOnceInsertMarker = {
    optionsMarker: OptionsMarker
    nameConfigGenerateForOnceInsert: string
}
export type GenerateFiles = {
    id: {
        pattern: typesActions.OptionsMarker['pattern']
        pathToMarker: typesActions.OptionsMarker['pathToMarker']
        markerTemplate: typesActions.OptionsMarker['markerTemplate']
    },
    onceInsert: boolean
}

// Function defineMarkerAndAddMarkerTemplate
export type DefineMarkerAndAddMarkerTemplate = {
    optionsMarker: OptionsMarker
    dataRedFile: string
}

// Function addConfigToFile
export type AddConfigToFile = {
    optionsMarker: OptionsMarker
    nameConfigGenerateForOnceInsert: string
}
