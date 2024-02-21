import express from 'express';
import { createServer } from 'https';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import taskRouter from './routes/tasks.js';
import configureSocketIO from './sockets/index.js';
// Todo: convert http to https

const app = express();
const corsOptions = {
  origin: '*', // Specify the allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  // optionsSuccessStatus: 204, // Specify the status code for successful preflight requests
};
app.use(express.json());
app.use(cors(corsOptions)); // allow all origins for development purposes only
// const port = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
};

// Create HTTPS server

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//task related routes
app.use('/api/tasks', taskRouter);

// Pass the HTTPS server instance to configure Socket.IO
configureSocketIO(app);

const httpsServer = createServer(options, app);
httpsServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
