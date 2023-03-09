export default class NodeKmsError extends Error {
    constructor(e: {}, eMap: any);
    _isCustomError: boolean;
    _isNodeKmsError: boolean;
    service: string;
    message: any;
    statusCode: any;
    errorCode: any;
    error: {};
}
