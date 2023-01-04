import { Application } from '@app/app';
import * as http from 'http';
import { AddressInfo } from 'net';
import { Service } from 'typedi';




@Service()
export class Server {
    private static readonly appPort: string | number | boolean = Server.normalizePort(process.env.PORT || '3000');
    private server!: http.Server;

    constructor(private readonly application: Application) {}

    private static normalizePort(val: number | string): number | string | boolean {
        const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        return false;
    }

    async init(): Promise<void> {
        this.application.app.set('port', Server.appPort);

        this.server = http.createServer(this.application.app);


        this.server.listen(Server.appPort);
        this.server.on('error', (error: NodeJS.ErrnoException): void => this.onError(error));

        this.server.on('listening', (): void => this.onListening());

    }


    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        const bind: string = typeof Server.appPort === 'string' ? 'Pipe ' + Server.appPort : 'Port ' + Server.appPort;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening(): void {
        const address: AddressInfo = this.server.address() as AddressInfo;
        const bind = `port ${address.port}`;
        console.log(`Listening on ${bind}`);
    }
}

