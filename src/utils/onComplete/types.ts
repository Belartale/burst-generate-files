// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export type OnComplete = {
    configItem: typesCommon.OptionCustomGen | typesCommon.OptionCLIGenTemplate // types.OptionCustomGen |
    selectedNames: types.GetSelectedName | types.GetSelectedName[]
}
