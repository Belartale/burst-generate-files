// Types
import * as typesActions from '../types';
import * as typesCommon from '../../types';

export type SelectDirectory = {
    template: typesCommon.SettingCLIGenTemplateRequiredOutputPath;
    selectedNames: typesActions.GetSelectedName[];
};

export type ShowWarningsAboutCheckMarkers = {
    template: typesCommon.SettingCLIGenTemplateRequiredOutputPath;
    newOutputPath: string | string[];
};
