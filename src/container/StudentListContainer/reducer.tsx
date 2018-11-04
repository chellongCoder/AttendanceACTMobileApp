import app_constant from "../../Common/app_constant";
import { Lesson } from "../LessonContainer/interface";

export type State = {
  isValidate: boolean;
  insertMessage: string;
  newLesson: Lesson;
};

const initialState = {
  isValidate: false,
  insertMessage: "",
  newLesson: null
};

export default function(state: State = initialState, action) {
  let data = action.data;
  switch (action.type) {
    case app_constant.ATTENDANCE.VALIDATE_LESSON:
      break;
    case app_constant.LESSON.INSERT_NEW_LESSON:
      return {
        ...state,
        insertMessage: action.data,
        newlesson: action.newLesson
      };
    case app_constant.LESSON.RESET_NEWLESSON_MESS: {
      return {
        ...state,
        insertMessage: "",
        newlesson: null
      };
    }
    default:
      break;
  }
  return state;
}
