import { Client } from "@notionhq/client";
import * as core from "@actions/core";
import addItem from "./additem";
import { getLastCommit, getCommit } from "./getItem";

const key = core.getInput("NOTION_TOKEN");
const notion = new Client({ auth: key });
const db = core.getInput("NOTION_DATABASE_ID");
const owner = core.getInput("OWNER");
const repository = core.getInput("REPOSITORY");
const projectDict = JSON.parse(core.getInput("PROJECT_DICT"));
const project = projectDict[repository];
const token = core.getInput("GH_TOKEN");

async function main(client: Client, database_id: string) {
  const response = await client.databases.query({
    database_id,
  });

  console.log("Connect Notion");
}

main(notion, db)
  .then(() => {
    getLastCommit(token, owner, repository).then((sha) => {
      if (sha)
        getCommit(token, owner, repository, sha).then((data) => {
          if (data && data.message && data.author && data.date && data.url)
            addItem(
              notion,
              db,
              data?.message,
              data?.author,
              repository,
              data?.date,
              project,
              data?.message,
              data?.url
            );
        });
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
