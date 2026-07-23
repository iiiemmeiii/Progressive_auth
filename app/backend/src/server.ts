import { App } from '@/app.js';
import { env } from '@/config/env.js';

const app = new App();

app.instance.listen(env.port,"0.0.0.0", () => {
    console.log(`Server is running in [${env.nodeEnv.toUpperCase()}] node`);
    console.log(`url > localhost:${env.port}`);
});
