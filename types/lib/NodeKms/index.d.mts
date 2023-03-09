export default class NodeKms {
    constructor(config?: {});
    config: {
        KEY_ALGO: any;
        KEY_LENGTH: number;
        KEY_PAIR_ALGO: any;
        KEY_PAIR_LENGTH: number;
        MASTER_KEY_BUFFER: Buffer;
        MASTER_IV_BUFFER: Buffer;
    };
    generateDataKey(): Promise<{
        dataKey: any;
        encryptedDataKey: string;
    }>;
    generateDataKeyPair(): Promise<{
        privateKey: any;
        publicKey: any;
        encryptedPrivateKey: string;
    }>;
    encrypt(plainText?: string, options?: {}): Promise<string>;
    decrypt(ciphertext?: string, options?: {}): Promise<string>;
}
