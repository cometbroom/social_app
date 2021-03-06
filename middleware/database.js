import { MongoClient } from "mongodb";
import "dotenv/config";

import nextConnect from "next-connect";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

//wn should I use new url parser? or unified topology?+
//const client = new MongoClient(process.env.MONGODB_URI);
export const db_client = new MongoClient(process.env.MONGODB_URI);

async function database(req, res, next) {
  await db_client.connect();
  req.dbClient = db_client;
  req.db = db_client.db("Submarine");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
