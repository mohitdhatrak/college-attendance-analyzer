import { displayData } from "./display-data.js";

export const displayLastCheckedData = () => {
    const lastCheckedContainer = document.getElementById(
        "last-checked-container"
    );

    const lastRecordData = JSON.parse(localStorage.getItem("lastRecordData"));
    const lastCheckedDate = localStorage.getItem("lastCheckedDate");

    if (lastRecordData) {
        const compare = document.getElementById("compare");
        compare.style.display = "block";

        const dateContainer = document.createElement("div");
        dateContainer?.classList?.add("date-container");
        dateContainer.innerText = `${lastCheckedDate}`;
        lastCheckedContainer.appendChild(dateContainer);

        const totalSum = JSON.parse(localStorage.getItem("totalSum"));
        const presentSum = JSON.parse(localStorage.getItem("presentSum"));

        displayData(lastRecordData, lastCheckedContainer, totalSum, presentSum);
    } else {
        lastCheckedContainer.style.display = "none";
    }
};
