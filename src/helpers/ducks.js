function assetIdAsFloat(assetId) {
    let i = 0;
    let hash = 0;
    if (!assetId) return 0;
    while (i < assetId.length)
        hash = (hash << 5) + hash + assetId.charCodeAt(i++);

    return Math.abs(((hash * 10) % 0x7fffffff) / 0x7fffffff);
}

function parseDuckName(name) {
    return name?.match(
        /(DUCK|BABY)-([A-Z|0-9]{8})-([GMHIJKNLOR]{1})([BGRUYZ]{1})/
    );
}

function createDuckURL(name, assetId) {
    const duck = parseDuckName(name);
    if (duck[1] == 'DUCK') {
        const hasDruckGenes = duck[2].indexOf('I') !== -1;
        const druck =
            '&druck=' +
            (hasDruckGenes ? (assetIdAsFloat(assetId) > 0.5 ? '1' : '2') : '');
        return `https://wavesducks.com/api/v1/ducks/${duck[2]}.svg?onPerch=false&jedi=false${druck}&color=${duck[4]}`;
    } else if (duck[1] == 'BABY') {
        return 'https://wavesducks.com/ducks/ducklings/duckling-0.svg';
    }
}

function createStyle(name) {
    const duck = parseDuckName(name);
    if (duck[1] === 'BABY') {
        return 'background-color: rgb(240, 231, 213)';
    } else if (duck[4] === 'B') {
        return 'background-color: rgb(173, 216, 230);';
    } else if (duck[4] === 'G') {
        return 'background-color: rgb(217, 246, 179);';
    } else if (duck[4] === 'Y') {
        return 'background-color: rgb(248, 238, 157);';
    } else if (duck[4] === 'R') {
        return 'background-color: rgb(255, 160, 122);';
    } else if (duck[4] === 'U') {
        return 'background-color: rgb(230, 212, 239);';
    } else {
        return '';
    }
}

export { createStyle, createDuckURL, parseDuckName };
