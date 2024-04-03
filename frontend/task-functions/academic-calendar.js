const ACADEMIC_CALENDAR_URL =
    "https://res.cloudinary.com/mohitdhatrak/image/upload/v1712150076/academic-calendar_llxbyl.png";

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
