import { Client } from "@notionhq/client";
import * as core from "@actions/core";
import addItem from "./addItem";
import { getLastCommit, getCommit, getPushEvent } from "./getItem";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.NOTION_TOKEN ?? core.getInput("NOTION_TOKEN");
const client = new Client({ auth: key });
const databaseId =
  process.env.NOTION_DATABASE_ID ?? core.getInput("NOTION_DATABASE_ID");
const owner = process.env.OWNER ?? core.getInput("OWNER");
const repository = process.env.REPOSITORY ?? core.getInput("REPOSITORY");
const projectname = process.env.PROJECT_NAME ?? core.getInput("PROJECT_NAME");
const token = core.getInput("GH_TOKEN");
const timezone = core.getInput("TIMEZONE");

async function main(client: Client, database_id: string) {
  const response = await client.databases.query({
    database_id,
  });

  console.log("Connect Notion");
}

main(client, databaseId)
  .then(() => {
    getPushEvent(token).then((data) => {
      console.log(data);
      if (
        data &&
        data.message &&
        data.author &&
        data.timestamp &&
        data.url &&
        data.repo
      ) {
        const { message, author, timestamp, url, repo } = data;
        addItem(
          client,
          databaseId,
          message,
          author,
          repo,
          timestamp,
          url,
          timezone,
          projectname
        );
      }
    });
    // getLastCommit(token, owner, repository).then((sha) => {
    //   if (sha)
    //     getCommit(token, owner, repository, sha).then((data) => {
    //       if (data && data.message && data.author && data.date && data.url) {
    //         const { message, author, date, url } = data;
    //         addItem(
    //           client,
    //           databaseId,
    //           message,
    //           author,
    //           repository,
    //           date,
    //           url,
    //           timezone,
    //           projectname
    //         );
    //       }
    //     });
    // });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
