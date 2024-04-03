import { displayAcademicCalendar } from "./task-functions/academic-calendar.js";
import { getAttendanceData } from "./task-functions/get-attendance-data.js";
import { displayLastCheckedData } from "./task-functions/last-checked-data.js";
import { showPwaBanner } from "./task-functions/pwa-custom-banner.js";

// to clear user's localstorage whenever new changes are pushed
const APP_VERSION = "1.0.2";
const currentVersion = localStorage.getItem("appVersion");
if (currentVersion !== APP_VERSION) {
    localStorage.clear();

    localStorage.setItem("appVersion", APP_VERSION);
}

// custom PWA banner
showPwaBanner();

// check later if caching is working?
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("./task-functions/service-worker.js")
            .then(
                (res) =>
                    console.log(
                        "Service Worker registered with scope:",
                        res.scope
                    ),
                (err) => console.log("Service Worker registration failed:", err)
            );
    });
}

// show academic calendar
displayAcademicCalendar();

// show last checked attendance data, as waiting time is long
displayLastCheckedData();

// get attendance data as per button click!
getAttendanceData();
