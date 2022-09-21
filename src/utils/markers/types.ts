// Re-export
export * from './collectorPatternFileAndTemplates/types';

// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export type AddMarkerFiles = {
    pathToTemplate: typesCommon.OptionCommonTypes['pathToTemplate']
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
        pathToMarker: types.OptionsMarker['pathToMarker']
        pattern: types.OptionsMarker['pattern']
        markerTemplate: types.OptionsMarker['markerTemplate']
    },
    onceInsert: boolean
}

// Function defineMarkerAndAdd
export type DefineMarkerAndAdd = {
    pathToTemplate: typesCommon.OptionCommonTypes['pathToTemplate']
    optionsMarker: OptionsMarker
    dataRedFile: string
    PROJECT_ROOT: string
}

// Function addConfigToFile
export type AddConfigToFile = {
    optionsMarker: OptionsMarker
    configGenerateNameForOnceInsert: string
}
