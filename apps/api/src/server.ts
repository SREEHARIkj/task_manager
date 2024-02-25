import express from 'express';
import { createServer } from 'https';
import { createServer as createHTTPServer } from 'http';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import taskRouter from './routes/tasks.js';
import configureSocketIO from './sockets/index.js';
import { fileURLToPath } from 'url';

const app = express();
const corsOptions = {
  origin: '*', // Specify the allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  // optionsSuccessStatus: 204, // Specify the status code for successful preflight requests
};
app.use(express.json());
app.use(cors(corsOptions)); // allow all origins for development purposes only
// const port = process.env.PORT || 3000;

const port = 3000;

//task related routes
app.use('/api/tasks', taskRouter);

// Pass the HTTPS server instance to configure Socket.IO
const server = (ENV: string | undefined) => {
  if (ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const options = {
      key: fs.readFileSync(path.join(__dirname, 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    };
    const httpsServer = createServer(options, app);
    configureSocketIO(httpsServer);
    return httpsServer;
  } else {
    const httpServer = createHTTPServer(app);
    configureSocketIO(httpServer);
    return httpServer;
  }
};

server(process.env.NODE_ENV).listen(port, () => {
  console.log(`Task manager app listening on port ${port}`);
});
