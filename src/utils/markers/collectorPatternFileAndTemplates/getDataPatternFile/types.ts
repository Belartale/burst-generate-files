// Types
import * as typesCommon from '../../../../types';
import * as types from '../../../types';

export type GetDataIfIsFileOrReturnArgument = {
    tabs: string
    pathToTemplate: typesCommon.OptionCommonTypes['pathToTemplate']
    optionsMarker: types.OptionsMarker
    PROJECT_ROOT: string
};

export type ReadPatternFile = {
    path: string
    tabs: string
    pattern: types.OptionsMarker['pattern']
}
