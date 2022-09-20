// Types
import * as types from '../types';

export type AddMarkerFiles = {
    markers: OptionsMarker[]
    selectedNames: types.GetSelectedName | types.GetSelectedName[]
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
        pathToMarker: types.OptionsMarker['pathToMarker']
        pattern: types.OptionsMarker['pattern']
        markerTemplate: types.OptionsMarker['markerTemplate']
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
