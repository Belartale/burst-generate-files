// Types
import * as types from './types';

export const onComplete = ({ setting }: types.OnComplete) => {
    if (setting.onComplete) {
        setting.onComplete(setting);
    }
};
