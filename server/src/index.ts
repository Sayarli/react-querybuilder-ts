import pgPromise from 'pg-promise';
import {connect}  from 'mongoose';
import Deneme from './Deneme';
import {Mongo} from './mongo';
import {convertSQL} from './interface'
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { PostgreSQL } from './postresql';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const pg = pgPromise({});
export const db = pg("postgres://postgres:12345@localhost:5432/sampledb?sslmode=disable");
//----------------------
connect('mongodb://localhost/deneme-db');

app.use(express.static(path.join(__dirname, '/../../client/build')));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '/../../client/build/index.html'));
});

app.post('/api/sales', async (req, res) => {
  const query = req.body;
  const mongoQuery = new Mongo(query);
  const postgreQuery = new PostgreSQL("sales", query, "order_id");
  
  let data: any = [];
  try{
      // const temp = convertSQL(mongoQuery);
      // console.log("MongoDB: "+JSON.stringify(temp));
      // data = await Deneme.find(temp);
      // -----------------------
      const temp2 = convertSQL(postgreQuery);
      console.log("PostgreSQL: "+JSON.stringify(temp2));
      data =await db.any(temp2, postgreQuery.query.params);
  }catch(error){
      console.log(error);
      res.json({ data: [], error});
      return;
  }

  res.json({ data, error: null });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server1 is running at https://localhost:${port}`);
});