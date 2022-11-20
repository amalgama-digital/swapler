import { getPuzzleImage } from "./puzzle";

function getMetadata(description) {
    var resp = {};
    try {
        resp = JSON.parse(description);
    } catch {
        const regex = '{"id": ([0-9]*)"?, "url": "(https://[a-z./0-9]*)"}';
        const matched = description.match(regex);
        resp = {
            id: matched[1],
            url: matched[2],
        };
    } finally {
        return resp;
    }
}

/**
 * get asset url from issuer contract by address
 */
async function urlByIssuer(issuer, assetId) {
    try {
        // Puzzle
        if (issuer === '3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By') {
            const url = await getPuzzleImage(assetId);
            return url;
        }

        const loc = `${window.nodeURL}/addresses/data/${issuer}`;
        const reqData = {
            keys: [`${assetId}_url`],
        };
        const response = await fetch(loc, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        });
        const res = await response.json();
        let url =  res[0]?.value;

        return url
    } catch (error) {
        console.error('url_by_issuer', error);
    }
}

export { getMetadata, urlByIssuer };
