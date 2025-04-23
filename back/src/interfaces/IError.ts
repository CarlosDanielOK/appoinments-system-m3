export interface PostgresError {
    detail?: string;
    code: number;
}

export interface ErrorResponse {
    message: string;
    detail?: string;
    code?: number;
}