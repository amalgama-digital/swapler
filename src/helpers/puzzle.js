async function getPuzzleImage(assetId) {
    const metadata = {};
    try {
        const resp = await fetch(
            `${window.nodeURL}/addresses/data/3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By?key=nft_${assetId}_image`
        );
        const res = await resp.json();
        metadata.url = res[0]?.value;
    } catch(error) {
        console.error('getPuzzleImage', error);
    }

    return metadata;
}

export { getPuzzleImage };
