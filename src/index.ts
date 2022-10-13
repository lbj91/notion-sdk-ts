import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import addItem from "./additem";
import * as core from '@actions/core';
import * as github from '@actions/github';

dotenv.config();

// const key = process.env.NOTION_TOKEN ?? "";
const key = core.getInput('NOTION_TOKEN');
const notion = new Client({auth:key});
// const db = process.env.NOTION_DATABASE_ID ?? "";
// const message = process.env.MESSAGE ?? "";
// const author = process.env.AUTHOR ?? "";
// const repository = process.env.REPOSITORY ?? "";
// const date = process.env.DATE ?? "";
const db = core.getInput('NOTION_DATABASE_ID');
const message = core.getInput('MESSAGE');
const author = core.getInput('AUTHOR');
const repository = core.getInput('REPOSITORY');
const date = core.getInput('DATE');

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
