import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import addItem from "./additem";

dotenv.config();

const key = process.env.NOTION_TOKEN ?? "";
const db = process.env.NOTION_DATABASE_ID ?? "";
const notion = new Client({auth:key});
const message = process.env.MESSAGE ?? "";
const author = process.env.AUTHOR ?? "";
const repository = process.env.REPOSITORY ?? "";
const date = process.env.DATE ?? "";

async function main(client:Client, database_id: string) {

  const response = await client.databases.query({
    database_id
  });

  console.log("Got response:", response);

}

main(notion, db)
  .then(() => addItem(notion,db,message,author,repository,date))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
