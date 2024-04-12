import { displayAcademicCalendar } from "./task-functions/academic-calendar.js";
import { APP_VERSION } from "./task-functions/app-version.js";
import { getAttendanceData } from "./task-functions/get-attendance-data.js";
import { hashString } from "./task-functions/hash-string.js";
import { displayLastCheckedData } from "./task-functions/last-checked-data.js";
import { showPwaBanner } from "./task-functions/pwa-custom-banner.js";

// TODO: use versionUpdateType() to update localstorage as per change
// to clear user's localstorage whenever new changes are pushed
const previousVersion = localStorage.getItem("appVersion");
if (previousVersion !== APP_VERSION) {
    localStorage.clear();
    localStorage.setItem("appVersion", APP_VERSION);
}

// custom PWA banner
showPwaBanner();

// TODO: check if caching is working as expected or change logic
// registering service worker
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
const lastCheckedDate = displayLastCheckedData();

// TODO: add basic analytics
// get attendance data as per button click!
getAttendanceData(lastCheckedDate);

const socialsLink = document.getElementById("socials");
socialsLink.addEventListener("click", function () {
    const username = document.getElementById("username")?.value;
    if (username) {
        // hashing sap id before sending to google analytics
        const hashedSapId = hashString(username);
        gtag("event", "opened_socials", {
            sap_id: hashedSapId,
        });
    } else {
        gtag("event", "opened_socials");
    }
});
