export interface CustomError extends Error {
    httpStatus: number;
    code: string;
    message: string;
}
