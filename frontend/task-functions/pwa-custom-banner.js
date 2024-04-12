import { hashString } from "./hash-string.js";

export const showPwaBanner = () => {
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

    const customInstallPrompt = () => {
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

                    const username = document.getElementById("username")?.value;
                    if (username) {
                        // hashing sap id before sending to google analytics
                        const hashedSapId = hashString(username);
                        gtag("event", "installed_pwa", {
                            sap_id: hashedSapId,
                        });
                    } else {
                        gtag("event", "installed_pwa");
                    }
                }
            });
        });
    };
};
