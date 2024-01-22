
// get the current date element by Id.
const currentDateElement  = $("#currentDay");

// assign current date to the now variable and format it using format method.
const now = dayjs().format('ddd, MMMM DD, YYYY, h:mm A');

// display it as text 
currentDateElement.text(now)
