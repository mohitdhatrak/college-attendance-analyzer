export const displayData = (
    attendanceData,
    container,
    totalSum,
    presentSum
) => {
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
