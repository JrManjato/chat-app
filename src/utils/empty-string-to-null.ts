export const emptyStringToNull = (obj: object) => {
    for (let key in obj) {
        if (typeof obj[key] === "string" && obj[key] === "") {
            obj[key] = null;
        }
    }
    return obj;
}