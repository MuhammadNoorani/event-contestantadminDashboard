import { PinataSDK } from "@pinata/sdk";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
});

export default pinata;