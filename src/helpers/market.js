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
            items.push(item);
        }
    }
    return items;
}

export {
    getData
}