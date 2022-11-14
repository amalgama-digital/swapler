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
        const loc = `${window.nodeURL}/addresses/data/${issuer}`;
        const reqData = {
            "keys": [
                `${assetId}_url`
            ]
        };
        const response = await fetch(
            loc,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            }
        );
        const res = await response.json();
        return res[0]?.value;
    } catch (error) {
        console.error("url_by_issuer", error);
    }
}

export { getMetadata, urlByIssuer };
