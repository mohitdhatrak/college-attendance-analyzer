import { SERVER_URL } from "../env.js";
import { displayData } from "./display-data.js";
import { extractTableData } from "./extract-html-json-data.js";
import { semesterStart } from "./get-semester-data.js";
import { hashString } from "./hash-string.js";
import { sortedColouredData } from "./sort-colour-data.js";
import { getDateTime } from "./store-date-time.js";

// selecting the main html elements
const fetchDataBtn = document.getElementById("fetch-data-btn");
const panelContainer = document.getElementById("panel-container");
const errorContainer = document.getElementById("error-container");
const loader = document.getElementById("loader");
const feedbackForm = document.getElementById("feedback-form");

let lastCheckedDate;

// get semester data
const { semesterYear, semesterMonths } = semesterStart();

export const getAttendanceData = (date) => {
    fetchDataBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const username = document.getElementById("username")?.value;
        const password = document.getElementById("password")?.value;

        // reset displayed data
        feedbackForm.style.display = "none";
        while (panelContainer.firstChild) {
            panelContainer.removeChild(panelContainer.firstChild);
        }
        while (errorContainer.firstChild) {
            errorContainer.removeChild(errorContainer.firstChild);
        }

        // basic form validation
        if (username?.trim() == "" || password?.trim() == "") {
            const error = document.createElement("div");
            error.innerText = "Please fill required fields!";
            error?.classList?.add("error-text");
            errorContainer.appendChild(error);
        } else {
            lastCheckedDate = date;
            fetchData(username, password);
            loader.style.display = "block";
            fetchDataBtn.disabled = true;
        }
    });
};

const fetchData = (username, password) => {
    fetch(`${SERVER_URL}/scrape`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            months: semesterMonths,
            year: semesterYear,
        }),
        mode: "cors",
    })
        .then((response) => response.text())
        .then((data) => {
            loader.style.display = "none";
            fetchDataBtn.disabled = false;

            // hashing sap id before sending to google analytics
            const hashedSapId = hashString(username);
            gtag("event", "successful_check", {
                sap_id: hashedSapId,
            });

            // extracting useful json data from html
            const jsonData = extractTableData(data);

            // assigning colour zones and sorting
            const attendanceData = sortedColouredData(jsonData);

            let totalSum = 0;
            let presentSum = 0;
            for (const lecture of attendanceData) {
                totalSum += lecture?.total;
                presentSum += lecture?.attended;
            }

            // new error case handling
            const percentage = (presentSum * 100) / totalSum;
            if (totalSum == 0 || isNaN(percentage)) {
                throw Error("Data not found");
            }

            // since no error, store in localstorage
            localStorage.setItem("totalSum", JSON.stringify(totalSum));
            localStorage.setItem("presentSum", JSON.stringify(presentSum));
            // store attendance data too
            localStorage.setItem(
                "lastRecordData",
                JSON.stringify(attendanceData)
            );

            // getting date and time of check
            const dateTime = getDateTime();

            // add feedback form
            feedbackForm.style.display = "block";
            feedbackForm.innerHTML =
                "Any suggestions? " +
                "<a target='_blank' href='https://forms.gle/PCoypEjL3CsADjRZ6'>Share here</a>";
            feedbackForm?.classList?.add("feedback-container");
            feedbackForm
                ?.querySelector("a")
                ?.addEventListener("click", function () {
                    gtag("event", "opened_suggestion_form", {
                        sap_id: hashedSapId,
                    });
                });

            // adding date containers and titles
            addContainerHeaders(dateTime);

            // displaying the data
            displayData(attendanceData, panelContainer, totalSum, presentSum);
        })
        .catch((error) => {
            console.log(error);
            loader.style.display = "none";
            fetchDataBtn.disabled = false;

            // hashing sap id before sending to google analytics
            const hashedSapId = hashString(username);
            gtag("event", "exception", {
                description: error,
                sap_id: hashedSapId,
            });

            // add feedback form
            feedbackForm.style.display = "block";
            feedbackForm.innerHTML =
                "Still facing issues? " +
                "<a target='_blank' href='https://forms.gle/PCoypEjL3CsADjRZ6'>Share here</a>";
            feedbackForm?.classList?.add("feedback-container");
            feedbackForm
                ?.querySelector("a")
                ?.addEventListener("click", function () {
                    gtag("event", "opened_issue_form", {
                        sap_id: hashedSapId,
                    });
                });

            // TODO: add DB to send error logs to it

            const errorDiv = document.createElement("div");
            if (error?.message?.includes("Data not found")) {
                errorDiv.innerHTML =
                    "Data not found," + "<br>" + "please try again later!";
            } else {
                errorDiv.innerHTML =
                    "Please check credentials," +
                    "<br>" +
                    "or try again later!";
            }
            errorDiv?.classList?.add("error-text");
            errorContainer.appendChild(errorDiv);
        });
};

const addContainerHeaders = (dateTime) => {
    // compare current data with previous data - title

    if (lastCheckedDate) {
        const compare = document.getElementById("compare");
        compare.innerText = "Compare with your last checked data: ";
        compare?.classList?.add("compare-title");
        compare.style.display = "block";
    }

    // display current data headings
    const currentData = document.createElement("div");
    currentData?.classList?.add("current-data");
    currentData.style.display = "block";
    currentData.innerText = "Current data: ";
    panelContainer.appendChild(currentData);

    const dateContainer = document.createElement("div");
    dateContainer?.classList?.add("date-container");
    dateContainer.innerText = `${dateTime}`;
    panelContainer.appendChild(dateContainer);
};
