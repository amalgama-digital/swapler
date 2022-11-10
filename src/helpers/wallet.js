import { ProviderKeeper } from '@waves/provider-keeper';

import { getMetadata, urlByIssuer } from './metadata'

async function connectKeeper() {
    if (window.signer) {
        const authData = { data: 'https://swapler.com/' };

        try {
            let res = await window.signer.setProvider(
                new ProviderKeeper(authData)
            );
            res = await window.signer.login();
            const wallet = {};
            wallet.address = res.address;
            wallet.publicKey = res.publicKey;

            return wallet;
        } catch (error) {
            return { error };
        }
    }
}

async function getNFTs(address, userNFTs) {
    const url = `${window.nodeURL}/assets/nft/${address}/limit/1000`;
    try {
        const resp = await fetch(url);
        const respData = await resp.json();
        for (const elem of respData) {
            const data = {};
            data.name = elem.name;
            data.assetId = elem.assetId;
            data.issuer = elem.issuer;

            const metadata = await getMetadata(elem.description);
            data.metadata = metadata;

            data.metadata.url = data.metadata.url
                                ?? await urlByIssuer(
                                    data.issuer,
                                    data.assetId
                                );
            data.metadata.id = Number(data.name
                .replace('#', '')
                .split(' ')[1]);

            data.price = 0;

            userNFTs.push(data);
        }
    } catch(error) {
        console.error(error);
    }
}
/**
 * 
 * @param { String } funcName Name of the function to invoke 
 * @param { Array } args Arguments for the function [{ type, value }]
 * @param { Object[] } payment Payment Object [{ assetId, amount }]
 * @returns 
 */
async function invokeFunction(
    funcName,
    args,
    payment,

) {
    if (window.signer) {
        const invocation = await window.signer.invoke({
            dApp: window.contractAddress,
            fee: 900000, // TODO: check
            payment,
            call: {
                'function': funcName,
                args,
            },
        });
        return invocation;
    } else {
        throw new Error("signer not found");
    }
}

/**
 * Sale asset for waves with given price
 * @param { String } assetId Asset id
 * @param { Number } price 
 */
async function offerForSale(assetId, price) {
    const args = [
        {
            type: 'string',
            value: 'WAVES'
        },
        {
            type: 'integer',
            value: Math.round(price * Math.pow(10, 8))
        }
    ];
    const payment = [
        {
            assetId,
            amount: 1,
        }
    ];
    try {
        const invocation = await invokeFunction(
            'offerForSale',
            args,
            payment
        );
        const response = await invocation.broadcast();
        return { 
            response,
            error: undefined
        };
    } catch(error) {
        return {
            response: undefined,
            error
        }
    }
}

/**
 * Make an offer on asset
 * @param { String } wantAssetId
 * @param { Object[] } payment What user want to swap on wantAssetId
 */
async function offerForSwap(wantAssetId, payment) {
    const args = [
        {
            type: 'string',
            value: wantAssetId
        }
    ];
    try {
        const invocation = await invokeFunction(
            'offerForSwap',
            args,
            payment
        );
        const response = await invocation.broadcast();
        return { 
            response,
            error: undefined
        };
    } catch(error) {
        return {
            response: undefined,
            error
        };
    }
}

// instant buy
async function buy(assetId, payment) {
    const args = [
        {
            type: 'string',
            value: assetId
        }
    ];
    try {
        const invocation = await invokeFunction(
            'buy',
            args,
            payment
        );
        const response = await invocation.broadcast();
        return { 
            response,
            error: undefined
        };
    } catch(error) {
        return {
            response: undefined,
            error
        };
    }
}
/**
 * confirm offer
 * @param {String} offerId 
 * @returns 
 */
async function swapDone(offerId) {
    const args = [
        {
            type: 'string',
            value: offerId
        }
    ];
    const payment = [];
    try {
        const invocation = await invokeFunction(
            'swapDone',
            args,
            payment
        );
        const response = await invocation.broadcast();
        return { 
            response,
            error: undefined
        };
    } catch(error) {
        return {
            response: undefined,
            error
        };
    }
}

// cancel selling nft
async function cancelSelling(assetId) {
    const args = [
        {
            type: 'string',
            value: assetId
        }
    ];
    const payment = [];
    try {
        const invocation = await invokeFunction(
            'cancelSelling',
            args,
            payment
        );
        const response = await invocation.broadcast();
        return { 
            response,
            error: undefined
        };
    } catch(error) {
        return {
            response: undefined,
            error
        }
    }
}

async function swapCancel(offerId) {
    const args = [
        {
            type: 'string',
            value: offerId
        }
    ];
    const payment = [];
    try {
        const invocation = await invokeFunction(
            'swapCancel',
            args,
            payment
        );
        const response = await invocation.broadcast();
        return { 
            response,
            error: undefined
        };
    } catch(error) {
        return {
            response: undefined,
            error
        };
    }
}

export { 
    connectKeeper,
    getNFTs,
    offerForSale,
    offerForSwap,
    buy,
    swapDone,
    swapCancel
};
