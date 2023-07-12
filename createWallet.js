const bitcoin = require('bitcoinjs-lib');
const log4js = require("log4js");
const BigNumber = require("bignumber.js")

log4js.configure({
    appenders: { log4js: { type: "file", filename: "./record.log" } },
    categories: { default: { appenders: ["log4js"], level: "ALL" } }
});

const logger = log4js.getLogger("default");

// Replace 'privateKey' with your actual private key
const from = '000000000000000000000000000000000000000000000003ffffffffffffffff';
const to = "0000000000000000000000000000000000000000000000020000000000000000";

const getPublicKey = (privateKey) => {
    // Create a Bitcoin ECPair object using the private key
    const keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));

    // Get the compressed public key in hexadecimal format
    const publicKey = keyPair.publicKey.toString('hex');

    const { address } = bitcoin.payments.p2pkh({ pubkey: new Buffer(publicKey, "hex") })
    // Display the Bitcoin address
    if (address === "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so") {
        logger.info("address", address)
    }
}

const start = () => {
    let startValue = BigNumber(from, 16);
    let endValue = BigNumber(to, 16);

    while (parseInt(startValue, 16) >= parseInt(endValue, 16)) {
        let hexString = startValue.toString(16).padStart(64, "0");
        // Use the hexString value as needed
        startValue = startValue.minus(1);
        console.log("hexString", hexString)
        getPublicKey(hexString)
        if (hexString === "0000000000000000000000000000000000000000000000020000000000000000") {
            logger.info("no result")
            break;
        }
    }
}

start();