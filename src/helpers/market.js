import { getMetadata } from './metadata'

async function parseData(offerId, data) {
    const el = {};
    el.offerId = offerId;

    el.owner = data.find((v) => v.key === offerId + '_owner')?.value;
    el.issuer = data.find((v) => v.key === offerId + '_issuer')?.value;
    el.name = data.find((v) => v.key === offerId + '_name')?.value;
    el.offer = data.find((v) => v.key === offerId + '_offer')?.value;
    el.price = data.find((v) => v.key === offerId + '_price')?.value;
    el.metadata = await getMetadata(
        data.find((v) => v.key === offerId + '_description')?.value);

    return el;
}

function getUniqueOfferIDs(data) {
    const offerIDs = [];
    for (const elem of data) {
        if (offerIDs.indexOf(elem.offerId) === -1) {
            offerIDs.push(elem.offerId);
        } else {
            continue;
        }
    }

    return offerIDs;
}

function parseOffers(offer, data) {
    const o = {};
    const offerId = offer?.split('_')[1]
    const filtered = data.filter(el => el.key.includes(offerId));

    o.issuer = filtered.find(el => el.key.endsWith('issuerSwap'))?.value;
    o.owner = filtered.find(el => el.key.endsWith('ownerSwap'))?.value

    const price = filtered.find(el => el.key.endsWith('priceSwap'))?.value 
    const splittedPrice = price?.split('_');

    o.price = splittedPrice ? [splittedPrice[1], Number(splittedPrice[2])] : undefined;
    o.offerId = offerId;
    return o
}

function getAssetOffers(assetId, data) {
    const offers = [];
    const assetOffers = data.filter((el) => {
        return el.key.startsWith('Swap_')
            && el.key.endsWith('_offerSwap')
            && el.value == assetId
    });

    for (const v of assetOffers) {
        if (v) {
            const offer = parseOffers(v.key, data);
            if (offer.owner) {
                offers.push(offer);
            }
        }
    }
    return offers;
}
/**
 * fetches contract data from the node api
 * @returns Object[] 
 */
async function getData() {
    const response = await fetch(`${window.nodeURL}/addresses/data/${window.contractAddress}`);
    const respJSON = await response.json();
    const items = [];
    const idData = [];
    for (const elem of respJSON) {
        const splitted = elem.key.split('_');
        if (splitted.length == 2 && splitted[0].length > 30) {
            const itemData = {};
            itemData.offerId = splitted[0];
            idData.push(itemData);
        }
    }

    const offerIDs = getUniqueOfferIDs(idData);
    for (const offerId of offerIDs) {
        const item = await parseData(offerId, respJSON);
        if (item.owner) {
            const offers = getAssetOffers(offerId, respJSON);
            item.offers = offers;
            items.push(item);
        }
    }
    return items;
}
async function getAssetName(assetId) {
    const resp =  await fetch(`${window.nodeURL}/assets/details/${assetId}`);
    const data = await resp.json(); 
    return data.name;
}
export {
    getData,
    getAssetName
}