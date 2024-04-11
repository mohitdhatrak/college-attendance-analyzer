export const hashString = (str) => {
    return CryptoJS.SHA512(str).toString();
};
