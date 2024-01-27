type ResponseStatus = "success" | "error"
export type APISuccessResponse<T> = {
    status: "success"
    message: string
    data: T
}
export type APIErrorResponse = {
    status: "error"
    code: number
    message: string
    time?: object
    stack?: string | undefined
}
// export type APIResponse = APISuccessResponse | APIErrorResponse

export enum HttpStatusCode {
    OK = 200,
    CREATED_SUCCESS = 201, // data created successfully!
    NO_CONTENT = 204, // success operation without content (logout)
    REDIRECT = 301, // redirect
    BAD_REQUEST = 400, // form not valid
    UNAUTHORIZED = 401, // access token
    FORBIDDEN = 403, // admin privileges
    NOT_FOUND = 404, // page not found
    CONFLICT = 409, // exist data already
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504 //
}

/*
1xx: informational responses
    100 Continue: The server has received the request headers and the client should proceed to send the request body.

2xx: successful responses
    200 OK: The request was successful.
    201 Created: The request was successful, and a new resource was created as a result.
    204 No Content: The server successfully processed the request, but there is no content to send.

3xx: redirection messages
    301 Moved Permanently: The requested page has been permanently moved to a new location.
    302 Found (or Moved Temporarily): The requested page has been temporarily moved to a new location.
    304 Not Modified: The client can use cached data.

4xx: client error responses
    400 Bad Request: The server could not understand the request due to bad syntax.
    401 Unauthorized: The request requires user authentication.
    403 Forbidden: The server understood the request, but it refuses to authorize it.
    404 Not Found: The server did not find the requested resource.

5xx: server error responses
    500 Internal Server Error: A generic error message returned when an unexpected condition was encountered.
    502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
    503 Service Unavailable: The server is not ready to handle the request.
*/

/*

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}
*/
