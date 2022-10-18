import { Client } from "@notionhq/client";
import * as core from "@actions/core";
import addItem from "./addItem";
import { getLastCommit, getCommit } from "./getItem";

const key = core.getInput("NOTION_TOKEN");
const client = new Client({ auth: key });
const databaseId = core.getInput("NOTION_DATABASE_ID");
const owner = core.getInput("OWNER");
const repository = core.getInput("REPOSITORY");
const projectname = core.getInput("PROJECT_NAME");
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
    getLastCommit(token, owner, repository).then((sha) => {
      if (sha)
        getCommit(token, owner, repository, sha).then((data) => {
          if (data && data.message && data.author && data.date && data.url) {
            const { message, author, date, url } = data;
            addItem(
              client,
              databaseId,
              message,
              author,
              repository,
              date,
              url,
              timezone,
              projectname
            );
          }
        });
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
