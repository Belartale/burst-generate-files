// Types
import * as typesCommon from '../../types';
import * as typesActions from '../types';

export type CreateFiles = {
    pathToTemplate: typesCommon.SettingCommonTypes['pathToTemplate']
    outputPath: typesCommon.OutputPath
    selectedNames: typesActions.GetSelectedName | typesActions.GetSelectedName[]
}
