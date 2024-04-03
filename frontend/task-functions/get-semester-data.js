import { SERVER_URL } from "../env.js";

export const semesterStart = () => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];

    let startMonthIndex = 0;
    let semesterYear = 2024;

    fetch(`${SERVER_URL}/semester`)
        .then((response) => response.json())
        .then((data) => {
            startMonthIndex = Number(data?.month) - 1;
            semesterYear = Number(data?.year);
        })
        .catch((error) => console.log(error));

    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();

    // possible bug - currently this handles only same year data
    // won't be an issue for now as our semesters start and end in same year
    const semesterMonths = [];
    for (let i = startMonthIndex; i <= currentMonthIndex; i++) {
        semesterMonths.push(months[i]);
    }

    return { semesterYear, semesterMonths };
};
