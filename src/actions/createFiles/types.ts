// Types
import * as typesCommon from '../../types';
import { GetSelectedName } from '../getSelectedName/types';

export type CreateFiles = {
    pathToTemplate: typesCommon.OptionCommonTypes['pathToTemplate']
    outputPath: typesCommon.OptionCommonTypes['outputPath']
    selectedNames: GetSelectedName | GetSelectedName[]
}
