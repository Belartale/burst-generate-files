// Re-export
export * from './collectorTemplates/types';

// Types
import * as types from '../types';

export type AddMarkerFiles = {
    markers: OptionsMarker[]
    selectedNames: types.GetSelectedName | types.GetSelectedName[]
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
    configGenerateNameForOnceInsert: string
}
export type GenerateFiles = {
    id: {
        pattern: types.OptionsMarker['pattern']
        pathToMarker: types.OptionsMarker['pathToMarker']
        markerTemplate: types.OptionsMarker['markerTemplate']
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
    configGenerateNameForOnceInsert: string
}
