import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName : string, params? : Object) {
    _navigator &&
        _navigator.dispatch(NavigationActions.navigate({
            routeName,
            params,
        }));
}

function goBack() {
    _navigator &&
        _navigator.dispatch(
            NavigationActions.back()
        );
}

function isRendered() {
    if (_navigator) {
        return true;
    }
    return false;
}

// add other navigation functions that you need and export them

export const NavigationService = {
    navigate,
    setTopLevelNavigator,
    isRendered,
    goBack
};
