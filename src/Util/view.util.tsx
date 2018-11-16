import { Toast } from "native-base";

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getDate(date) {
  let splits = date.split(/[A-Z+]/);
  return splits;
}

export function randomString(length) {
  return Math.round(
    Math.pow(10, length + 1) - Math.random() * Math.pow(10, length)
  )
    .toString(10)
    .slice(1);
}


export function showMessage(text, type, duration) {
  Toast.show({
    text : text,
    type : type,
    duration : duration,
    buttonText : "OK"
  })
}