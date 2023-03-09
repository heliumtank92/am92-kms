export const VALID_KEY_SPECS: string[];
export const VALID_KEY_PAIR_SPECS: string[];
export const ENCRYPTION_ALGO: "aes-256-cbc";
export const MASTER_KEY_LENGTH: 32;
export const MASTER_IV_LENGTH: 16;
export namespace PRIVATE_KEY_EXPORT_OPTIONS {
    const type: string;
    const format: string;
}
export namespace PUBLIC_KEY_EXPORT_OPTIONS {
    const type_1: string;
    export { type_1 as type };
    const format_1: string;
    export { format_1 as format };
}
