import { SERVER_URL } from "./env.js";

let deferredPrompt;
let isInstallPromptShown = false;
const pwaBanner = document.getElementById("install-banner");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    pwaBanner.style.display = "flex";

    // Save the event to use it later
    deferredPrompt = event;
    if (!isInstallPromptShown) {
        customInstallPrompt();
        isInstallPromptShown = true;
    }
});

function customInstallPrompt() {
    const closeBannerBtn = document.getElementById("close-banner-btn");
    const installPwaBtn = document.getElementById("install-pwa-btn");

    closeBannerBtn.addEventListener("click", () => {
        pwaBanner.style.display = "none";
        deferredPrompt = null;
    });

    installPwaBtn.addEventListener("click", () => {
        // Show the browser's default install prompt
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            console.log(`User ${choiceResult.outcome} the install prompt`);
            if (choiceResult.outcome === "accepted") {
                deferredPrompt = null;
            }
        });
    });
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
            (res) =>
                console.log("Service Worker registered with scope:", res.scope),
            (err) => console.log("Service Worker registration failed:", err)
        );
    });
}

const fetchBtn = document.getElementById("fetch-data-btn");
const panelContainer = document.getElementById("panel-container");
const lastCheckedContainer = document.getElementById("last-checked-container");
const loader = document.getElementById("loader");

fetchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // reset displayed data
    while (panelContainer.firstChild) {
        panelContainer.removeChild(panelContainer.firstChild);
    }

    if (username?.trim() == "" || password?.trim() == "") {
        const errorContainer = document.createElement("div");
        errorContainer.innerText = "Please fill required fields!";
        errorContainer?.classList?.add("error-text");
        panelContainer.appendChild(errorContainer);
    } else {
        fetchData(username, password);
        loader.style.display = "block";
        fetchBtn.disabled = true;
    }
});

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
let year = 2024;

const semesterStart = () => {
    fetch(`${SERVER_URL}/semester`)
        .then((response) => response.json())
        .then((data) => {
            startMonthIndex = Number(data?.month) - 1;
            year = Number(data?.year);
        })
        .catch((error) => console.log(error));
};
semesterStart();

const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth();

// possible bug - currently this handles only same year data
// won't be an issue for now as our semesters start and end in same year
const defaultMonths = [];
for (let i = startMonthIndex; i <= currentMonthIndex; i++) {
    defaultMonths.push(months[i]);
}

const canMissCount = (lecture) => {
    let count = 0;
    let total = lecture?.total;
    let present = lecture?.attended;

    // LAB has '2' value for each lab session
    if (
        (lecture?.course?.includes("LAB") &&
            !lecture?.course?.includes("UBIQUITOUS")) || // added exception for UBI lab, it shows count 1
        lecture?.course?.includes("INNOVATIVE PRODUCT DEVELPOMENT") // added exception for IPD, it shows count 2?
    ) {
        total += 2;
        while ((present * 100) / total >= 75) {
            count++;
            total += 2;
        }
    } else {
        total++;
        while ((present * 100) / total >= 75) {
            count++;
            total++;
        }
    }

    return count;
};

const needToAttendCount = (lecture) => {
    let count = 0;
    let total = lecture?.total;
    let present = lecture?.attended;

    // LAB has '2' value for each lab session
    if (
        (lecture?.course?.includes("LAB") &&
            !lecture?.course?.includes("UBIQUITOUS")) || // added exception for UBI lab, it shows count 1
        lecture?.course?.includes("INNOVATIVE PRODUCT DEVELPOMENT") // added exception for IPD, it shows count 2?
    ) {
        while ((present * 100) / total < 75) {
            count++;
            present += 2;
            total += 2;
        }
    } else {
        while ((present * 100) / total < 75) {
            count++;
            present++;
            total++;
        }
    }

    return count;
};

const displayData = (attendanceData, container, totalSum, presentSum) => {
    const totalPercent = document.createElement("div");
    totalPercent?.classList?.add("total-percent");

    totalPercent.innerText = `Total percentage = ${(
        (presentSum * 100) /
        totalSum
    ).toFixed(2)}%
            Total lectures = ${totalSum}
            Present = ${presentSum}
            Absent = ${totalSum - presentSum}`;
    container.appendChild(totalPercent);

    attendanceData.forEach((lecture) => {
        const panel = document.createElement("div");
        panel?.classList?.add("panel");

        const panelHeader = document.createElement("div");
        panelHeader?.classList?.add("panel-header");
        panelHeader.innerHTML = `
                    <span>${lecture?.course} = ${lecture?.percent}%</span>
                    <span class="dropdown-arrow"></span>`;
        panelHeader.addEventListener("click", () => {
            panelContent?.classList?.toggle("active");
            panelHeader
                .querySelector(".dropdown-arrow")
                ?.classList?.toggle("active");
        });

        const panelContent = document.createElement("div");
        panelContent?.classList?.add("panel-content");

        let htmlString = `
                        <p>Percentage: ${lecture.percent}</p>
                        <p>Total Lectures: ${lecture.total}</p>
                        <p>Present: ${lecture.attended}</p>
                        <p>Absent: ${lecture.total - lecture.attended}</p>`;
        const count = lecture?.count;
        if (lecture.percent >= 75) {
            if (count == 0) {
                panelHeader?.classList?.add("yellow");
                htmlString += `
                            <p>To stay >= 75% attendance</p>
                            <p>CAN MISS: ${count} ${
                    lecture?.course?.includes("LAB") ? "labs" : "lectures"
                }</p>`;
            } else {
                panelHeader?.classList?.add("green");
                htmlString += `
                            <p>To stay >= 75% attendance</p>
                            <p>CAN MISS: ${count} ${
                    lecture?.course?.includes("LAB")
                        ? count == 1
                            ? "lab"
                            : "labs"
                        : count == 1
                        ? "lecture"
                        : "lectures"
                } safely</p>`;
            }
        } else {
            panelHeader?.classList?.add("red");
            htmlString += `
                            <p>To have >= 75% attendance</p>
                            <p>NEED TO ATTEND: ${count} ${
                lecture?.course?.includes("LAB")
                    ? count == 1
                        ? "lab"
                        : "labs"
                    : count == 1
                    ? "lecture"
                    : "lectures"
            } atleast</p>`;
        }

        panelContent.innerHTML = htmlString;

        panel.appendChild(panelHeader);
        panel.appendChild(panelContent);
        container.appendChild(panel);
    });
};

const lastRecordData = JSON.parse(localStorage.getItem("lastRecordData"));
const lastCheckedDate = localStorage.getItem("lastCheckedDate");
if (lastRecordData) {
    const dateContainer = document.createElement("div");
    dateContainer?.classList?.add("date-container");
    dateContainer.innerText = `Last Checked: ${lastCheckedDate}`;
    lastCheckedContainer.appendChild(dateContainer);

    const totalSum = JSON.parse(localStorage.getItem("totalSum"));
    const presentSum = JSON.parse(localStorage.getItem("presentSum"));

    displayData(lastRecordData, lastCheckedContainer, totalSum, presentSum);
} else {
    lastCheckedContainer.style.display = "none";
}

function fetchData(username, password) {
    fetch(`${SERVER_URL}/scrape`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            months: defaultMonths,
            year,
        }),
        mode: "cors",
    })
        .then((response) => response.text())
        .then((data) => {
            loader.style.display = "none";
            fetchBtn.disabled = false;

            // gtag("event", "successful_check", {
            //     sap_id: username,
            // });

            let attendanceData = extractTableData(data);
            attendanceData = Object.values(attendanceData);

            // sort as per color zone and percent
            const colourObj = {
                red: [],
                yellow: [],
                green: [],
            };

            // first make separate arrays as per colours
            attendanceData.forEach((lecture) => {
                if (lecture.percent < 75) {
                    const count = needToAttendCount(lecture);
                    lecture.count = count;
                    colourObj.red.push(lecture);
                } else {
                    const count = canMissCount(lecture);
                    lecture.count = count;
                    if (count == 0) {
                        colourObj.yellow.push(lecture);
                    } else {
                        colourObj.green.push(lecture);
                    }
                }
            });

            // sort each array as per the colour
            Object.values(colourObj).forEach((arr) => {
                arr.sort((a, b) => a.percent - b.percent);
            });

            // combine each sorted array in order of colours
            const sortedDataArr = [
                ...colourObj.red,
                ...colourObj.yellow,
                ...colourObj.green,
            ];

            attendanceData = sortedDataArr;
            // console.log(attendanceData);

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

            localStorage.setItem("totalSum", JSON.stringify(totalSum));
            localStorage.setItem("presentSum", JSON.stringify(presentSum));

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            const checkedDate =
                (day < 10 ? "0" + day : day) +
                "/" +
                (month < 10 ? "0" + month : month) +
                "/" +
                year;
            localStorage.setItem("lastCheckedDate", checkedDate);

            localStorage.setItem(
                "lastRecordData",
                JSON.stringify(attendanceData)
            );

            const dateContainer = document.createElement("div");
            dateContainer?.classList?.add("date-container");
            dateContainer.innerText = `Date checked: ${checkedDate}`;
            panelContainer.appendChild(dateContainer);

            displayData(attendanceData, panelContainer, totalSum, presentSum);
        })
        .catch((error) => {
            console.log(error);

            loader.style.display = "none";
            fetchBtn.disabled = false;

            // gtag("event", "failed_check", {
            //     sap_id: username,
            // });

            const errorContainer = document.createElement("div");
            if (error?.message?.includes("Data not found")) {
                errorContainer.innerText =
                    "Data not found, please try again later!";
            } else {
                errorContainer.innerText =
                    "Please check credentials, or try again later!";
            }
            errorContainer?.classList?.add("error-text");
            panelContainer.appendChild(errorContainer);
        });
}

function extractTableData(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Extract the content inside the <pre> tag
    const preContent = doc.querySelector("pre")?.textContent;
    const tableHtml = parser.parseFromString(preContent, "text/html");
    // console.log(tableHtml);

    const data = {};
    const rows = tableHtml.querySelectorAll("table tbody tr");

    // special case - when current month has no data, table is empty, so remove those values
    const validRows = Array.from(rows).filter(
        (row) => !row?.children?.[0]?.className?.includes("dataTables_empty")
    );

    validRows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const courseName = cells[1]?.textContent?.trim();
        let obj = {};

        if (data[courseName]?.course) {
            data[courseName].total += parseFloat(cells[2]?.textContent?.trim());
            data[courseName].attended += parseFloat(
                cells[3]?.textContent?.trim()
            );
            data[courseName].percent = Number(
                (
                    (data[courseName]?.attended * 100) /
                    data[courseName]?.total
                ).toFixed(2)
            );
        } else {
            const total = parseFloat(cells[2]?.textContent?.trim());
            const attended = parseFloat(cells[3]?.textContent?.trim());
            obj = {
                course: cells[1]?.textContent?.trim(),
                total,
                attended,
                percent: Number(((attended * 100) / total).toFixed(2)),
            };
            data[courseName] = obj;
        }
    });

    return data;
}
