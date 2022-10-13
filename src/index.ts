import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import addItem from "./additem";
import * as core from "@actions/core";
import * as github from "@actions/github";

dotenv.config();

// const key = process.env.NOTION_TOKEN ?? "";
const key = core.getInput("NOTION_TOKEN");
console.log(key);
const notion = new Client({ auth: key });
// const db = process.env.NOTION_DATABASE_ID ?? "";
// const message = process.env.MESSAGE ?? "";
// const author = process.env.AUTHOR ?? "";
// const repository = process.env.REPOSITORY ?? "";
// const date = process.env.DATE ?? "";
const db = core.getInput("NOTION_DATABASE_ID");
const message = core.getInput("MESSAGE");
const author = core.getInput("AUTHOR");
const repository = core.getInput("REPOSITORY");
const date = core.getInput("DATE");
const projectDict = JSON.parse(core.getInput("PROJECT_DICT"));
const project = projectDict[repository];
const branch = core.getInput("BRANCH");
const body = core.getInput("COMMIT_CONTENT");
const link = core.getInput("COMMIT_LINK");

async function main(client: Client, database_id: string) {
  const response = await client.databases.query({
    database_id,
  });

  console.log("Got response:");
  response.results.forEach((value) => console.dir(value));
}

main(notion, db)
  .then(() =>
    addItem(
      notion,
      db,
      message,
      author,
      repository,
      date,
      project,
      branch,
      body,
      link
    )
  )
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
