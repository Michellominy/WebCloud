import * as express from 'express';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import { HttpException } from './client-communication/http.exception';



@Service()
export class Application {
    app!: express.Application;
    private readonly internalError!: number;

    constructor() {
        this.app = express();
        this.internalError = StatusCodes.INTERNAL_SERVER_ERROR;

        this.config();

        this.bindRoutes();
    }

    bindRoutes(): void {
        this.app.use('/', (_req, res): void => {
            res.redirect('/api/docs');
        });
        this.errorHandling();
    }

    private config(): void {
        this.app.use(express.json());
    }

    private errorHandling(): void {
        this.app.use((_req: express.Request, _res: express.Response, next: express.NextFunction): void => {
            const err: HttpException = new HttpException('Not Found');
            next(err);
        });

        if (this.app.get('env') === 'development')
            this.app.use((err: HttpException, _req: express.Request, res: express.Response): void => {
                res.status(err._ || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });

        this.app.use((err: HttpException, _req: express.Request, res: express.Response): void => {
            res.status(err._ || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
