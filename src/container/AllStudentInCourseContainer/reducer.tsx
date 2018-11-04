import CONSTANT from "../../Common/app_constant";

const initialState = {
  student: null,
  messageInsertStudent: ""
};

export default function(state = initialState, action) {
  if (action.type === CONSTANT.STUDENT.INSERT_NEW_STUDENT) {
    return {
      ...state,
      messageInsertStudent: action.data,
      student: action.student
    };
  }

  return state;
}
