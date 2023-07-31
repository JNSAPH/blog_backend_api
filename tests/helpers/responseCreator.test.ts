import { createResponse } from '../../src/helpers/responseCreator';

describe('createResponse', () => {
  it('should create a response object with status code, body, and error flag (false by default)', () => {
    const statusCode = 200;
    const body = 'Success';
    const response = createResponse(statusCode, body);

    expect(response.statusCode).toBe(statusCode);
    expect(response.body).toBe(body);
    expect(response.error).toBe(false);
  });

  it('should create a response object with the provided error flag', () => {
    const statusCode = 400;
    const body = 'Bad Request';
    const error = true;

    const response = createResponse(statusCode, body, error);

    expect(response.statusCode).toBe(statusCode);
    expect(response.body).toBe(body);
    expect(response.error).toBe(true);
  });

  it('should create a response object with error flag as false when not provided', () => {
    const statusCode = 500;
    const body = 'Internal Server Error';
    const response = createResponse(statusCode, body);

    expect(response.statusCode).toBe(statusCode);
    expect(response.body).toBe(body);
    expect(response.error).toBe(false);
  });
});
