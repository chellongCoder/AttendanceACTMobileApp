import { environment } from './../Common/config';
function warn(error) {
    if (environment.testMenuEnabled) {
        console.warn(error.message || error);
    }
    throw error;
}
export default store => next => action => typeof action.then === 'function' ? Promise.resolve(action).then(next, warn) : next(action);
//# sourceMappingURL=promise.js.map