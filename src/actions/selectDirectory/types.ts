// Types
import * as typesActions from '../types';
import * as typesCommon from '../../types';

export type SelectDirectory = {
    template: typesCommon.SettingCLIGenTemplate,
    selectedNames: typesActions.GetSelectedName[]
}

export type ShowWarningsAboutCheckMarkers = {
    template: typesCommon.SettingCLIGenTemplate
    newOutputPath: string | string[]
}
