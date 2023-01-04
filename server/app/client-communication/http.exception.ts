import { StatusCodes } from 'http-status-codes';

export class HttpException extends Error {
    name!: string;

    constructor(message: string, public _: number = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = 'HttpException';
    }
}

