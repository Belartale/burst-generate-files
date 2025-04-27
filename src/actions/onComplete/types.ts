// Types
import * as typesCommon from '../../types';

export type OnComplete = {
    init: typesCommon.SettingCustomGen | typesCommon.SettingCLIGenTemplate;
    result: typesCommon.SettingCustomGen | typesCommon.SettingCLIGenTemplate;
};
