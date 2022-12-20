// Types
import * as typesCommon from '../../types';
import { GetSelectedName } from '../getSelectedName/types';

export type CreateFiles = {
    pathToTemplate: typesCommon.SettingCommonTypes['pathToTemplate']
    outputPath: typesCommon.SettingCommonTypes['outputPath']
    selectedNames: GetSelectedName | GetSelectedName[]
}
