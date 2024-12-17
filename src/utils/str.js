const str_limit = (str, limit = 30) => {
    if (str == null) {
        return "";
    }
    return str.length > limit ? str.substring(0, limit) + "..." : str;
}

export default str_limit;