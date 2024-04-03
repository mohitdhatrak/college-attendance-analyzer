export const extractTableData = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Extract the content inside the <pre> tag
    const preContent = doc.querySelector("pre")?.textContent;
    const tableHtml = parser.parseFromString(preContent, "text/html");

    const jsonData = {};
    const rows = tableHtml.querySelectorAll("table tbody tr");

    // special case - when current month has no data, table is empty, so remove those values
    const validRows = Array.from(rows).filter(
        (row) => !row?.children?.[0]?.className?.includes("dataTables_empty")
    );

    validRows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const courseName = cells[1]?.textContent?.trim();
        let obj = {};

        if (jsonData[courseName]?.course) {
            jsonData[courseName].total += parseFloat(
                cells[2]?.textContent?.trim()
            );
            jsonData[courseName].attended += parseFloat(
                cells[3]?.textContent?.trim()
            );
            jsonData[courseName].percent = Number(
                (
                    (jsonData[courseName]?.attended * 100) /
                    jsonData[courseName]?.total
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
            jsonData[courseName] = obj;
        }
    });

    return jsonData;
};
