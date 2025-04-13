// Types
import * as types from './types';

export const onComplete = ({ init, result }: types.OnComplete) => {
    if (result.onComplete) {
        result.onComplete({ init, result });
    }
};
