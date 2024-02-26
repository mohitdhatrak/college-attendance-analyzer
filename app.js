const fetchBtn = document.getElementById("fetchDataBtn");
const panelContainer = document.getElementById("panel-container");
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
        isLoading = true;
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

const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth();

// for Sem 6, college starts from month of Jan, so i = 0
const defaultMonths = [];
for (let i = 0; i <= currentMonthIndex; i++) {
    defaultMonths.push(months[i]);
}

const canMissCount = (lecture) => {
    let count = 0;
    let total = lecture?.total;
    let present = lecture?.attended;

    // LAB has '2' value for each lab session
    if (lecture?.course?.includes("LAB")) {
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
    if (lecture?.course?.includes("LAB")) {
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

function fetchData(username, password) {
    // fetch("http://127.0.0.1:5000/scrape", {
    fetch("https://mohitdhatrak.pythonanywhere.com/scrape", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            months: defaultMonths,
            year: 2024,
        }),
        mode: "cors",
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            loader.style.display = "none";
            fetchBtn.disabled = false;

            let attendanceData = extractTableData(data);

            // sort as per percent
            const dataArr = Object.values(attendanceData);
            dataArr.sort((a, b) => a.percent - b.percent);
            const sortedData = {};
            dataArr.forEach((item) => {
                sortedData[item.course] = item;
            });
            attendanceData = sortedData;
            console.log(attendanceData);

            const totalPercent = document.createElement("div");
            totalPercent?.classList?.add("total-percent");

            let sum = 0;
            for (const obj of Object.values(attendanceData)) {
                sum += obj?.percent;
            }
            totalPercent.innerText = `Total percentage = ${(
                sum / Object.values(attendanceData)?.length
            ).toFixed(2)}%`;
            panelContainer.appendChild(totalPercent);

            Object.values(attendanceData).forEach((lecture) => {
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
                if (lecture.percent >= 75) {
                    const count = canMissCount(lecture);
                    if (count == 0) {
                        panelHeader?.classList?.add("yellow");
                        htmlString += `
                            <p>To stay >= 75% attendance</p>
                            <p>CAN MISS: ${count} lectures</p>`;
                    } else {
                        panelHeader?.classList?.add("green");
                        htmlString += `
                            <p>To stay >= 75% attendance</p>
                            <p>CAN MISS: ${count} ${
                            count == 1 ? "lecture" : "lectures"
                        } safely</p>`;
                    }
                } else {
                    const count = needToAttendCount(lecture);
                    panelHeader?.classList?.add("red");
                    htmlString += `
                            <p>To have >= 75% attendance</p>
                            <p>NEED TO ATTEND: ${count} lectures atleast</p>`;
                }

                panelContent.innerHTML = htmlString;

                panel.appendChild(panelHeader);
                panel.appendChild(panelContent);
                panelContainer.appendChild(panel);
            });
        })
        .catch((error) => {
            console.log(error);

            loader.style.display = "none";
            fetchBtn.disabled = false;

            const errorContainer = document.createElement("div");
            errorContainer.innerText =
                "Please check credentials, or try again later!";
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
    console.log(tableHtml);

    const data = {};
    const rows = tableHtml.querySelectorAll("table tbody tr");
    console.log(rows);

    rows.forEach((row) => {
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
