import compression from 'compression';
import express, { Application, NextFunction, Request, Response } from 'express';

import { Airport } from '@/interfaces/Airport.interface.js';

export class App {
    public readonly instance: Application;

    constructor() {
        console.log("1# APP constructor\n")
        this.instance = express();
        this.configureMiddlewares();
        this.configRoutes();
        this.configureErrorHandler();
    }

    private configRoutes(): void {
        console.log("2# configRoutes \n")

        this.instance.get('/', (req, res) => {
            res.header("Content-Type", "application/json");
            res.status(200).json("Home is ok")
        });

        this.instance.get('/health', (req: Request, res: Response) => {
            const data = {
                message: 'Everything is gonna be alrigth',
                status: 'ok',
                timestamp: new Date().toISOString(),
            };
            res.header("Content-Type", "application/json");
            res.status(200).json(data);
        });
        this.instance.get('/aeroports', (req: Request, res: Response) => {
            const airport: Airport[] = [
                {
                    city: 'Paris',
                    country: 'France',
                    iataCode: 'CDG',
                    name: 'Charles de Gaulle',
                },
                {
                    city: 'Bruxelles',
                    country: 'Belgique',
                    iataCode: 'BRU',
                    name: 'Brussels Airport',
                },
                {
                    city: 'New York',
                    country: 'États-Unis',
                    iataCode: 'JFK',
                    name: 'John F. Kennedy',
                },
            ];
            res.status(200).json(airport);
        });
    }
    


    private configureErrorHandler(): void {
        this.instance.use((req: Request, res: Response) => {
            res.status(404).json({ error: 'page not found' });
        });
    }
    private configureMiddlewares(): void {
        console.log("3# configureMiddlewares \n")
        // Le body est mis en json
        this.instance.use(express.json());
        this.instance.use(express.urlencoded({ extended: true }));
        this.instance.use(compression())

        this.instance.use((req: Request, res: Response, next: NextFunction) => {
            const start = Date.now();
            res.on('finish', () => {
                const data = {
                    duration: `${Date.now() - start} ms`,
                    method: req.method,
                    prot: req.protocol,
                    status: res.statusCode,
                    url: req.url,
                };
                console.log(data);
            });
            next();
        });
    }
}
