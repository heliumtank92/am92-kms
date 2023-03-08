export default class Kms {
    constructor(config?: {});
    config: {} | {
        KEY_ALGO: any;
        KEY_LENGTH: number;
        KEY_PAIR_ALGO: any;
        KEY_PAIR_LENGTH: number;
        MASTER_KEY_BUFFER: Buffer;
        MASTER_IV_BUFFER: Buffer;
    };
    generateDataKey: (() => Promise<{
        dataKey: string;
        encryptedDataKey: string;
    }>) | (() => Promise<{
        dataKey: any;
        encryptedDataKey: string;
    }>);
    generateDataKeyPair: (() => Promise<{
        privateKey: string;
        publicKey: string;
        encryptedPrivateKey: string;
    }>) | (() => Promise<{
        privateKey: any;
        publicKey: any;
        encryptedPrivateKey: string;
    }>);
    encrypt: ((Plaintext?: string, options?: {}) => Promise<string>) | ((plainText?: string, options?: {}) => Promise<string>);
    decrypt: ((Ciphertext?: string, options?: {}) => Promise<string>) | ((ciphertext?: string, options?: {}) => Promise<string>);
}
