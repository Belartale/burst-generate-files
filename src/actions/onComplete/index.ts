// Types
import * as types from './types';

export const onComplete = ({ setting }: types.OnComplete) => {
    setting.onComplete && setting.onComplete(
        setting,
    );
};
