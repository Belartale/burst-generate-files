// Types
import * as types from './types';

export const onComplete = ({ configItem }: types.OnComplete) => {
    configItem.onComplete && configItem.onComplete(
        configItem,
    );
};
