// Types
import * as typesCommon from '../../types';
import * as typesActions from '../types';

export type DirectorySelection = {
    template: typesCommon.SettingCLIGenTemplate,
    PROJECT_ROOT: string
    selectedNames: typesActions.GetSelectedName | typesActions.GetSelectedName[]
}
