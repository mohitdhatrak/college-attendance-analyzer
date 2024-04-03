export const getDateTime = () => {
    // date
    const currentDate = new Date();
    const year = currentDate.getFullYear() % 100;
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const checkedDate =
        (day < 10 ? "0" + day : day) +
        "/" +
        (month < 10 ? "0" + month : month) +
        "/" +
        year;

    // time
    let hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    let ampm = "am";
    if (hour >= 12) {
        hour -= 12;
        ampm = "pm";
    }
    if (hour === 0) {
        hour = 12;
    }

    const checkedTime =
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (minute < 10 ? "0" + minute : minute);

    const dateTime = `Date: ${checkedDate}, Time: ${checkedTime} ${ampm}`;

    // store date+time locally
    localStorage.setItem("lastCheckedDate", dateTime);

    return dateTime;
};
