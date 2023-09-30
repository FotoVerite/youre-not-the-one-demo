import * as Crypto from "expo-crypto";

export const createSHA1ID = async (data: string) => {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA1,
    data
  );
};
