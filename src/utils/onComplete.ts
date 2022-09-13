// Types
import * as types from '../types';

// Utils
import { replaceWordCase } from './replaceWordCase';

export const onComplete = ({ selectedConfigItem, selectedNames }: types.OnComplete) => {
    selectedConfigItem.onComplete && selectedConfigItem.onComplete(
        JSON.parse(replaceWordCase({
            string:                  JSON.stringify(selectedConfigItem),
            arrayStringAndNewString: selectedNames,
        })),
    );
};
