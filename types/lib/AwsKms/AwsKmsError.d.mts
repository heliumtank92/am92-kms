export default class AwsKmsError extends Error {
    constructor(e: {}, eMap: any);
    _isCustomError: boolean;
    _isAwsKmsError: boolean;
    service: string;
    message: any;
    statusCode: any;
    errorCode: any;
    error: {};
}
