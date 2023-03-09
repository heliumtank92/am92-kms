export default class AwsKms {
    constructor(config?: {});
    config: {};
    client: KMSClient;
    generateDataKey(): Promise<{
        dataKey: string;
        encryptedDataKey: string;
    }>;
    generateDataKeyPair(): Promise<{
        privateKey: string;
        publicKey: string;
        encryptedPrivateKey: string;
    }>;
    encrypt(Plaintext?: string, options?: {}): Promise<string>;
    decrypt(Ciphertext?: string, options?: {}): Promise<string>;
}
import { KMSClient } from "@aws-sdk/client-kms/dist-types/KMSClient.js";
