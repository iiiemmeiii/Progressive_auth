import dotenv from 'dotenv';

dotenv.config();

class EnvConfiguration {
    public readonly nodeEnv: string;
    public readonly port: number;

    public get isProd(): boolean {
        return this.nodeEnv === "prod";
    }

    constructor() {
        this.port = 3001;
        this.nodeEnv = process.env.NODE_ENV || "dev";
    }
}

export const env = new EnvConfiguration();