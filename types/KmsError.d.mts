export default class KmsError extends Error {
    constructor(e: {}, eMap: any);
    _isCustomError: boolean;
    _isKmsError: boolean;
    service: string;
    message: any;
    statusCode: any;
    errorCode: any;
    error: {};
}
