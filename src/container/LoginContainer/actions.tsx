import CONSTANT from "./../../Common/app_constant";
import { Course } from "./../StudentListContainer";
import { Admin, Response, Staff } from "./interface";
import { ThunkAction } from "redux-thunk";
import app_constant from "./../../Common/app_constant";
import LoginService from "../../Services/LoginService";
import { Toast } from "native-base";
import { NavigationService } from "../../Services/NavigationService";
export function saveAccountFB(account) {
  console.log("accout", account);
  return dispatch => {
    dispatch({
      type: CONSTANT.SAVE_ACCOUNT_FB,
      account
    });
  };
}

export async function insertStudent(url: string, student: Course): Promise {
  const response = await fetch(url, {
    body: JSON.stringify(student),
    headers: {
      Accept: "application/json",
      "cache-control": "no-cache",
      "Content-type": "application/json"
    },
    method: "POST"
  }).catch(error => {
    console.log(error);
  });
  console.log("response");
  const data = await response.json();
  console.log("data", data);

  return Promise.all([Promise.resolve(data)]);
  // return {
  //     type: CONSTANT.FETCH_LIST_COURSES,
  //     data
  // }
}
export function insertNewStaff(url: string, staff: Staff) {
  return dispatch => {
    const log = LoginService.insertNewStaff(url, staff)
      .then(result => {
        console.log("result", result);
      })
      .catch(e => {
        console.log(e);
      });
  };
}
export function fetchListStudentByCourseId(url, account): ThunkAction {
  console.log("url", url, "student", account);
  const log = insertStudent(url, account);
  return dispatch => {
    log.then(result => {
      dispatch({
        type: CONSTANT.SAVE_ACCOUNT_FB,
        account
      });
    });
    // dispatch(getDataCourses(url));
  };
}

async function fetchAccountAdmin(account: Admin, url: string) {
  const response = await fetch(url, {
    body: JSON.stringify(account),
    headers: {
      Accept: "application/json",
      "cache-control": "no-cache",
      "Content-type": "application/json"
    },
    method: "POST"
  }).catch(error => {
    console.log(error);
  });
  const data: Response = await response.json();
  console.log("data", data);
  let action = {};
  if (
    data.message.toLowerCase() === CONSTANT.LOGIN.MESSAGE_SUSCESS.toLowerCase()
  ) {
    action = {
      type: CONSTANT.LOGIN.GET_ACCOUT_ADMIN_SUSCESS,
      data: data.data[0]
    };
  } else {
    action = {
      type: CONSTANT.LOGIN.GET_ACCOUT_ADMIN_FAILURE
    };
  }
  return Promise.resolve(action);
  // return action;
  // }
}

export function getAccountAdmin(account: Admin, url: string): ThunkAction {
  const log = fetchAccountAdmin(account, url);
  return dispatch => {
    log
      .then(result => {
        console.log("result", result);

        if (result.type === app_constant.LOGIN.GET_ACCOUT_ADMIN_SUSCESS) {
          dispatch(result);
        } else {
          Toast.show({
            text: "Enter Valid Username & password!",
            duration: 2000,
            position: "top",
            textStyle: { textAlign: "center" }
          });
        }
      })
      .catch(error => {
        console.log("error ", error);
      });
  };
}
