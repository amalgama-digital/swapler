import { ProviderKeeper } from '@waves/provider-keeper';

async function connectKeeper() {
    if (window.signer) {
        const authData = { data: 'https://swapler.com/' };

        try {
            let res = await window.signer.setProvider(new ProviderKeeper(authData));
            res = await window.signer.login();
            const wallet = {};
            wallet.address = res.address;
            wallet.publicKey = res.publicKey;

            return wallet;
        } catch(error) {
            return { error };
        }
    }
}

export {
    connectKeeper
};
