export function saveAccountFB(account) {
    return dispatch => {
        dispatch({
            type: 'SAVE_ACCOUNT_FB',
            accountFacebook: account
        });
    };
}
//# sourceMappingURL=actions.js.map