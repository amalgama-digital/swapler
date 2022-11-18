function pluralize(text, cnt) {
    switch (cnt) {
        case 0:
            return `${text}s`;
        case 11:
            return `${text}s`;
        default:
            if(cnt % 10 == 1) {
                return text;
            } else {
                return `${text}s`;
            }
    }
}

export {
    pluralize
}
