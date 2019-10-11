import express from "express";
import bodyParser from "body-parser";
import path from 'path'
import './db/mongoose'
import { ENVIRONMENT } from "./util/secrets";
import jwtParsing from './config/jwt';

// Create Express server
const app = express()

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../client/web/dist')));

app.use(jwtParsing)

const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next);
};

// API routes
app.use('/api', require('./api/controllers/index'))

// Return frontend app
if (ENVIRONMENT === 'production') {
  app.use('**', express.static(path.join(__dirname, './../client/web/dist')))
}

export default app;