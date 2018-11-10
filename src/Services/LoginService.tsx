import app_constant from "../Common/app_constant";
import { Staff } from "../container/LoginContainer/interface";

export async function insertNewStaff(url: string, staff: Staff) {
  const response = await fetch(url, {
    body: JSON.stringify(staff),
    headers: {
      Accept: "application/json",
      "cache-control": "no-cache",
      "Content-type": "application/json"
    },
    method: "POST"
  }).catch(error => {
    console.log(error);
  });
  const data = await response.json();
  const action = {
    type: app_constant.LOGIN.INSERT_NEW_STAFF,
    data: data
  };
  return Promise.resolve(action);
}

export default {
  insertNewStaff
};
