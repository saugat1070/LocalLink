// class representing a generic application error
export class AppError extends Error {
    public statusCode: number;
    message: string;
    name: string;
    constructor(statusCode:number,message?: string,name?: string){
        super();
        this.statusCode = statusCode;
        this.message = message || '';
        this.name = name || '';
    }
}
/**
 * Represents an internal server error.
 * Implements the `AppError` interface.
 *
 * @class InternalServerError
 * @extends {AppError}
 */

export class InternalServerError extends AppError {
    constructor(message: string){
        super(500,message,"InternalServerError");
    }
}
/*
 * Represents a Bad Request error (HTTP 400).
 * This error is typically used to indicate that the server cannot process the request
 * due to client-side issues such as invalid input or malformed request syntax.
 *
 * @class BadRequestError
 * @extends {AppError}
 */
export class BadRequestError extends AppError {
    constructor(message: string){
        super(400,message,"BadRequestError");
    }
}
/* 
* Represents a Not Found error (HTTP 404).
* This error is typically used to indicate that the requested resource could not be found on the server.
*
* @class NotFoundError
* @extends {AppError}
*/
export class NotFoundError extends AppError {
    constructor(message: string){
        super(404,message,"NotFoundError");
    }
}
/* 
* Represents an Unauthorized error (HTTP 401).
* This error is typically used to indicate that the request requires user authentication.
*
* @class UnauthorizedError
* @extends {AppError}
*/
export class UnauthorizedError extends AppError {
    constructor(message: string){
        super(401,message,"UnauthorizedError");
    }
}
/* 
* Represents a Forbidden error (HTTP 403).
* This error is typically used to indicate that the request is not allowed for the user.
*
* @class ForbiddenError
* @extends {AppError}
*/
export class ForbiddenError extends AppError {
    constructor(message: string){
        super(403,message,"ForbiddenError");
    }
}
/* 
* Represents a Conflict error (HTTP 409).
* This error is typically used to indicate that the request conflicts with the current state of the server.
*
* @class ConflictError
* @extends {AppError}
*/
export class ConflictError extends AppError {
    constructor(message: string){
        super(409,message,"ConflictError");
    }
}
/* 
* Represents an Unprocessable Entity error (HTTP 422).
* This error is typically used to indicate that the server cannot process the request due to semantic errors.
*
* @class UnprocessableEntityError
* @extends {AppError}
*/
export class UnprocessableEntityError extends AppError {
    constructor(message: string){
        super(422,message,"UnprocessableEntityError");
    }
}
/* 
* Represents a Too Many Requests error (HTTP 429).
* This error is typically used to indicate that the client has sent too many requests in a given amount of time.
*
* @class TooManyRequestsError
* @extends {AppError}
*/
export class TooManyRequestsError extends AppError {
    constructor(message: string){
        super(429,message,"TooManyRequestsError");
    }
}
/* 
* Represents a Service Unavailable error (HTTP 503).
* This error is typically used to indicate that the server is temporarily unable to handle the request.
*
* @class ServiceUnavailableError
* @extends {AppError}
*/
export class ServiceUnavailableError extends AppError {
    constructor(message: string){
        super(503,message,"ServiceUnavailableError");
    }
}
/* 
* Represents a Gateway Timeout error (HTTP 504).
* This error is typically used to indicate that the server received an invalid response from an upstream server.
*
* @class GatewayTimeoutError
* @extends {AppError}
*/
export class GatewayTimeoutError extends AppError {
    constructor(message: string){
        super(504,message,"GatewayTimeoutError");
    }
}
/* 
* Represents a Not Implemented error (HTTP 501).
* This error is typically used to indicate that the server does not support the functionality required to fulfill the request.
*
* @class NotImplementedError
* @extends {AppError}
*/
export class NotImplementedError extends AppError {
    constructor(message: string){
        super(501,message,"NotImplementedError");
    }
}
/* 
* Represents a Bad Gateway error (HTTP 502).
* This error is typically used to indicate that the server received an invalid response from an upstream server.
*
* @class BadGatewayError
* @extends {AppError}
*/
export class BadGatewayError extends AppError {
    constructor(message: string){
        super(502,message,"BadGatewayError");
    }
}
/* 
* Represents a Method Not Allowed error (HTTP 405).
* This error is typically used to indicate that the request method is not allowed for the requested resource.
*
* @class MethodNotAllowedError
* @extends {AppError}
*/
export class MethodNotAllowedError extends AppError {
    constructor(message: string){
        super(405,message,"MethodNotAllowedError");
    }
}
/* 
* Represents a Request Timeout error (HTTP 408).
* This error is typically used to indicate that the server timed out while waiting for the request.
*
* @class RequestTimeoutError
* @extends {AppError}
*/
export class RequestTimeoutError extends AppError {
    constructor(message: string){
        super(408,message,"RequestTimeoutError");
    }
}
/* 
* Represents a Payload Too Large error (HTTP 413).
* This error is typically used to indicate that the request entity is larger than limits defined by the server.
*
* @class PayloadTooLargeError
* @extends {AppError}
*/
export class PayloadTooLargeError extends AppError {
    constructor(message: string){
        super(413,message,"PayloadTooLargeError");
    }
}
/* 
* Represents an Unsupported Media Type error (HTTP 415).
* This error is typically used to indicate that the server refuses to accept the request because the payload format is not supported.
*
* @class UnsupportedMediaTypeError
* @extends {AppError}
*/
export class UnsupportedMediaTypeError extends AppError {
    constructor(message: string){
        super(415,message,"UnsupportedMediaTypeError");
    }
}
