/**
 * 
 * @param statusCode HTML status code
 * @param body Response body
 * @param error Boolean indicating if the response is an error
 * @returns Returns standarized response
 * @example
 * // Returns a 200 response
 * createResponse(200, 'Success');
 * 
 * // Returns a 400 response
 * createResponse(400, 'Bad Request', true);
 */
export const createResponse = (statusCode: number, body: any, error?: Boolean ) => {
    return {
        statusCode,
        error: error || false,
        body
    }
}