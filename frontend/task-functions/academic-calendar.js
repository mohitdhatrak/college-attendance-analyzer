import { hashString } from "./hash-string.js";

const ACADEMIC_CALENDAR_URL =
    "https://res.cloudinary.com/mohitdhatrak/image/upload/v1739262017/academic_calendar_sem8.png";

export const displayAcademicCalendar = () => {
    const academicCalendar = document.getElementById("academic-calendar");

    academicCalendar
        .querySelector(".panel-header")
        .addEventListener("click", () => {
            academicCalendar
                .querySelector(".panel-header")
                .querySelector(".dropdown-arrow")
                ?.classList?.toggle("active");
            academicCalendar
                .querySelector(".panel-content")
                ?.classList?.toggle("active");

            const username = document.getElementById("username")?.value;
            if (username) {
                // hashing sap id before sending to google analytics
                const hashedSapId = hashString(username);
                gtag("event", "checked_academic_calendar", {
                    sap_id: hashedSapId,
                });
            } else {
                gtag("event", "checked_academic_calendar");
            }
        });

    OpenSeadragon({
        id: "image-viewer",
        prefixUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.1/images/",
        tileSources: {
            type: "image",
            url: ACADEMIC_CALENDAR_URL,
        },
        gestureSettingsMouse: {
            scrollToZoom: true,
        },
        gestureSettingsTouch: {
            scrollToZoom: true,
        },
    });
};
