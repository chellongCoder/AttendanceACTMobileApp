export function saveAccountFB(account : Object) {
    return {
        type : 'SAVE_ACCOUNT_FB',
        accountFacebook : account
    }
}