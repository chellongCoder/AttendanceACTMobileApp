import app_constant from "../../Common/app_constant";

export function loadingLesson(bool : boolean) {
    return {
        type : app_constant.iS_LOADING,
        isLoading : bool
    }
}