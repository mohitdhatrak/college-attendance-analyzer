export const APP_VERSION = "2.0.1"; // version -> major.minor.patch

export const versionUpdateType = (previousVersion) => {
    const newVersion = APP_VERSION;
    const previousVersionParts = previousVersion?.split(".");
    const newVersionParts = newVersion?.split(".");

    if (previousVersionParts[0] !== newVersionParts[0]) {
        return "major";
    }
    if (previousVersionParts[1] !== newVersionParts[1]) {
        return "minor";
    }
    if (previousVersionParts[2] !== newVersionParts[2]) {
        return "patch";
    }
};
