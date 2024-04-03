export const sortedColouredData = (data) => {
    let attendanceData = Object.values(data);

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

    return sortedDataArr;
};

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
