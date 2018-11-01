import app_constant from "../../Common/app_constant";

export type State = {
    isValidate : boolean;
}   

const initialState = {
    isValidate : false,
};

export default function (state : State = initialState, action) {
    let data = action.data;
    switch (action.type) {
        case app_constant.ATTENDANCE.VALIDATE_LESSON:
 
            break;
    
        default:
            break;
    }
    return state;
}