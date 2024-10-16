import { SERVER_URL } from "../env.js";

export const semesterStart = async () => {
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

    const currentDate = new Date();
    let startMonthIndex = currentDate.getMonth();
    let semesterYear = currentDate.getFullYear();

    try {
        const response = await fetch(`${SERVER_URL}/semester`);
        const data = await response.json();

        const currentMonthIndex = currentDate.getMonth();

        startMonthIndex = Number(data?.month) - 1;
        semesterYear = Number(data?.year);

        // Handle months only within the same year for now
        const semesterMonths = [];
        for (let i = startMonthIndex; i <= currentMonthIndex; i++) {
            semesterMonths.push(months[i]);
        }

        return { semesterYear, semesterMonths };
    } catch (error) {
        console.log(error);
        return { semesterYear, semesterMonths: [months[startMonthIndex]] }; // Return an empty array on error
    }
};
