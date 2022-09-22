// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export type CreateFiles = {
    pathToTemplate: typesCommon.OptionCommonTypes['pathToTemplate']
    outputPath: typesCommon.OptionCommonTypes['outputPath']
    selectedNames: types.GetSelectedName | types.GetSelectedName[]
}
