import { ProviderKeeper } from '@waves/provider-keeper';

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

async function invokeOffer(contractAddr) {
    if (window.signer) {
        const invokation = await window.signer.invoke({
            dApp: contractAddr,
            fee: 0,
            payment: [
                // 10 max
                {
                    assetId: '',
                    amount: 0,
                },
            ],
            call: {
                function: 'offer', // TODO
                args: [
                    // {
                    //     type: '', // 'integer' | 'string' | 'binary'
                    //     value: '' // number | 'string'
                    // }
                ],
            },
        });
        return invokation;
    }
}

export { connectKeeper, invokeOffer };
