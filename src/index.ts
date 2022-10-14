import { Client } from "@notionhq/client";
import * as core from "@actions/core";
import dotenv from "dotenv";
import addItem from "./additem";
import { getLastCommit, getCommit } from "./getItem";

// dotenv.config();

// const key = process.env.NOTION_TOKEN ?? "";
const key = core.getInput("NOTION_TOKEN");
const notion = new Client({ auth: key });
// const db = process.env.NOTION_DATABASE_ID ?? "";
// const message = process.env.MESSAGE ?? "";
// const author = process.env.AUTHOR ?? "";
// const repository = process.env.REPOSITORY ?? "";
// const date = process.env.DATE ?? "";
// const PROJECT_DICT = '{"notion-sdk-ts":"notion"}';
// const projectDict = JSON.parse(PROJECT_DICT);
// const project = projectDict[repository];
// const branch = "modify/test-2";
// const body = "test commit";
// const link = "https://github.com/lbj91/notion-sdk-ts/commits/main";
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
const token = core.getInput("GH_TOKEN");

async function main(client: Client, database_id: string) {
  const response = await client.databases.query({
    database_id,
  });

  console.log("Got response:");
  // response.results.forEach((value) => {
  //   if (Object.keys(value).includes("properties")) {
  //     console.dir(Object.values(value));
  //   }
  // });
}

main(notion, db)
  .then(() => {
    // addItem(
    //   notion,
    //   db,
    //   message,
    //   author,
    //   repository,
    //   date,
    //   project,
    //   branch,
    //   body,
    //   link
    // )
    getLastCommit(token, author, repository).then((sha) => {
      if (sha) getCommit(token, author, repository, sha);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
