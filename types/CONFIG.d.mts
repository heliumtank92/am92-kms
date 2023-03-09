export default CONFIG;
declare namespace CONFIG {
    export { ENABLED };
    export { KMS_TYPE as TYPE };
    export { KMS_KEY_SPEC as KEY_SPEC };
    export { KMS_KEY_PAIR_SPEC as KEY_PAIR_SPEC };
    export { KMS_KEY_FORMAT as KEY_FORMAT };
    export { KMS_PLAIN_TEXT_FORMAT as PLAIN_TEXT_FORMAT };
    export { KMS_CIPHER_TEXT_FORMAT as CIPHER_TEXT_FORMAT };
    export { KMS_MASTER_KEY_HEX as MASTER_KEY_HEX };
    export { KMS_MASTER_IV_HEX as MASTER_IV_HEX };
    export { KMS_AWS_KEY_ID as AWS_KEY_ID };
    export namespace AWS_CONNECTION_CONFIG {
        export { KMS_AWS_REGION as region };
    }
}
export const SERVICE: string;
declare const ENABLED: boolean;
declare const KMS_TYPE: string;
declare const KMS_KEY_SPEC: string;
declare const KMS_KEY_PAIR_SPEC: string;
declare const KMS_KEY_FORMAT: string;
declare const KMS_PLAIN_TEXT_FORMAT: string;
declare const KMS_CIPHER_TEXT_FORMAT: string;
declare const KMS_MASTER_KEY_HEX: string;
declare const KMS_MASTER_IV_HEX: string;
declare const KMS_AWS_KEY_ID: string;
declare const KMS_AWS_REGION: string;
