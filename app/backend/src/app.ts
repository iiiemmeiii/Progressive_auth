import compression from 'compression';
import express, { Application, NextFunction, Request, Response } from 'express';

import { Airport } from '@/interfaces/Airport.interface.js';

import { prisma } from './config/prisma.js';

export class App {
    public readonly instance: Application;

    constructor() {
        this.instance = express();
        this.configureMiddlewares();
        this.configRoutes();
        this.configureErrorHandler();
    }

    private configRoutes(): void {

        this.instance.get('/', (req, res) => {
            res.header("Content-Type", "application/json");
            res.status(200).json("Home is ok")
        });

        this.instance.get('/airline', async (req: Request, res: Response) => {
            const airlines = await prisma.airline.findMany()
            res.header("Content-Type", "application/json");
            res.status(200).json(airlines);
        });

        this.instance.get('/aeroports', async (req: Request, res: Response) => {
            const airport: Airport[] = await prisma.airport.findMany({ orderBy: { name: "asc" } })
            res.status(200).json(airport);
        });

        this.instance.get("/aeroports/:id", async (req: Request, res: Response) => {
            const airportById = await prisma.airport.findUnique({ where: { id: req.params.id.toString() } })
            if (!airportById) {
                res.status(404).json(`Airport ${req.params.id} not found`)
                return
            }
            res.status(200).json(airportById)
        })

        this.instance.post("/aeroports", async (req: Request, res: Response) => {
            const { city, country, iataCode, name } = req.body
            const createAirport = await prisma.airport.create({ data: { city, country, iataCode, name } })
            if (!createAirport) {
                res.status(404).json("impoible de creer un airport")
                return
            }
            res.status(201).json(createAirport)
        })

        this.instance.put("/aeroports/:id", async (req: Request, res: Response) => {
            const { city, country, iataCode, name } = req.body
            const updateAirport = await prisma.airport.update({
                data: { city, country, iataCode, name },
                where: { id: req.params.id.toString() }
            })
            if (!updateAirport) {
                res.status(404).json("impossible update" + req.body)
                return
            }
            res.status(200).json(updateAirport)
        })

        this.instance.delete("/aeroports/:id", async (req: Request, res: Response) => {
            await prisma.airport.delete({ where: { id: req.params.id.toString() } })
            res.status(204).send()
        })
    }



    private configureErrorHandler(): void {
        this.instance.use((req: Request, res: Response) => {
            res.status(404).json({ error: 'page not found' });
        });
    }
    private configureMiddlewares(): void {
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
