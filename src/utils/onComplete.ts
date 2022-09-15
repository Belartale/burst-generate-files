// Types
import * as types from '../types';

// Utils
import { replaceWordCase } from './replaceWordCase';

export const onComplete = ({ configItem, selectedNames }: types.OnComplete) => {
    configItem.onComplete && configItem.onComplete(
        JSON.parse(replaceWordCase({
            string:            JSON.stringify(configItem),
            stringsForReplace: selectedNames,
        })),
    );
};
