export function saveAccountFB(account : Object) {
    return dispatch => {
        dispatch({
            type: 'SAVE_ACCOUNT_FB',
            accountFacebook: account
        })
    }
}