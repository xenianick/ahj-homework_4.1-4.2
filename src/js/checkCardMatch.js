export default function checkCardMatch(item, inputValue) {
  let match = false;
  if (item.codes.some((number) => inputValue[0] === number[0])) {
    match = true;
  }
  if (inputValue.length >= 2) {
    if (item.codes.some((number) => inputValue[0] === number)) {
      match = true;
    } else if (item.codes.some((number) => inputValue.substring(0, 2) === number)) {
      match = true;
    } else {
      match = false;
    }
  }
  return match;
}
