// Re-export
export * from './getDataPatternFile/types';
export * from './getDataTemplate/types';

// Types
import * as typesCommon from '../../../types';
import * as types from '../types';

export type CollectorPatternFileAndTemplates = {
    pathToTemplate: typesCommon.OptionCommonTypes['pathToTemplate']
    optionsMarker: types.OptionsMarker
    tabs: string
    PROJECT_ROOT: string
}
