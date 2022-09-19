// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export type OnComplete = {
    configItem: typesCommon.OptionCLIGenTemplate // types.OptionCustomGenO |
    selectedNames: types.GetSelectedName | types.GetSelectedName[]
}
