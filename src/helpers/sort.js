function sortLowestPrice(data) {
    return data.sort((a, b) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    );
}

function sortHighestPrice(data) {
    return data.sort((a, b) =>
        a.price < b.price ? 1 : b.price < a.price ? -1 : 0
    );
}


export { sortLowestPrice, sortHighestPrice };
